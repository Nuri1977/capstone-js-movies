import './styles.css';
import { getMovies, countMovies } from './modules/shows-api.js';
import renderShows from './modules/render-home.js';
import commentsEventListeners from './modules/modals.js';

const startApp = async () => {
  const shows = await getMovies();
  renderShows(shows);
  commentsEventListeners();
  const movieCount = countMovies(shows);
  document.getElementById('movies-count').innerHTML = `(${movieCount})`;
};

startApp();