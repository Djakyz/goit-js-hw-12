import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
        <p><span class="label">Likes</span> ${likes}</p>
        <p><span class="label">Views</span> ${views}</p>
        <p><span class="label">Comments</span> ${comments}</p>
        <p><span class="label">Downloads</span> ${downloads}</p>
      </div>
    </li>
  `).join('');

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
  
 if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a').refresh();
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}
export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').classList.remove('hidden');
}
export function hideLoadMoreButton() {
  document.querySelector('.load-more').classList.add('hidden');
}

export function showEndOfResults() {
  const message = document.createElement('p');
  message.textContent = "We're sorry, but you've reached the end of search results.";
  message.classList.add('end-message');
  document.querySelector('.gallery').after(message);
}