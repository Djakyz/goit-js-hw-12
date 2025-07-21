
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

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) return;

  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  document.querySelector('.end-message')?.remove();

  await fetchImages();
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
