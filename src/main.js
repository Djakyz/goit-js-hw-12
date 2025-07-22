import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfResults,
} from './js/render-functions';

import { getImagesByQuery } from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  document.querySelector('.end-message')?.remove();

  await fetchImages();
 
  event.target.reset();

  form.elements.searchQuery.focus();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchImages();
});

async function fetchImages() {
  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;


    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    const totalLoaded = document.querySelectorAll('.gallery-item').length;

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      showEndOfResults();
    } else {
      showLoadMoreButton();
    }

    if (currentPage > 1) {
      scrollPage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
