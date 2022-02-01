import getMovies from './shows-api.js';
import displayComments from './comments.js';

const createModalHTML = (movie) => {
  const {
    name, summary, premiered,
    genres, language, image: { medium },
  } = movie;

  const img = medium;

  const modal = document.createElement('div');
  modal.className = 'modal d-flex col';

  modal.innerHTML = `<div class="modal-container d-flex col" id="modal-container">
  <div  id='modal-close-btn' class="click"><i class="fas fa-times"></i></div>
  <img src="${img}" alt="${name} image" class="modal-img">
  <h2 class="modal-title">${name}</h2>
  <div class="modal-info-line1 d-flex">
  <div class="d-flex"><p class="modal-info-title">Language:</p><p class="modal-info">${language}</p></div>
  <div class="d-flex"><p class="modal-info-title">Premiered:</p><p class="modal-info">${premiered}</p></div>
  </div>
  <div class="modal-info-line2 d-flex">
  <p class="modal-info-title">Genres:</p><ul class="modal-info" id="genres-list"></ul>
  </div>
  <div class="modal-summary d-flex col">
  <p class="modal-info-title">Summary:</p>
  ${summary}
  </div>
  </div>`;

  const body = document.getElementById('body');
  body.appendChild(modal);

  const genresList = document.getElementById('genres-list');
  genres.forEach((genre) => {
    const li = document.createElement('li');
    li.innerHTML = `${genre}`;
    genresList.appendChild(li);
  });
};

const filterMovie = async (id) => {
  const movies = await getMovies();
  const movie = movies.filter((movie) => movie.id === id);
  return movie;
};

const preventScroll = () => {
  const body = document.getElementById('body');
  body.classList.add('no-scroll');
};

const allowScroll = () => {
  const body = document.getElementById('body');
  body.classList.remove('no-scroll');
};

const closeModal = (node) => {
  node.parentNode.parentNode.remove();
  allowScroll();
};

const modalEventListeners = () => {
  const close = document.querySelector('#modal-close-btn');
  close.addEventListener('click', () => {
    closeModal(close);
  });
};

const createModal = async (id) => {
  const movie = await filterMovie(id);
  createModalHTML(movie[0]);
  modalEventListeners(id);
  displayComments(id);
};

const commentsEventListeners = () => {
  const buttons = document.querySelectorAll('.btn-comment');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      createModal(+button.id);
      preventScroll();
    });
  });
};

export default commentsEventListeners;