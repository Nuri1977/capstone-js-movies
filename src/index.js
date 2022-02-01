import './styles.css';
import commentsEventListeners from './modules/modals.js';
import getMovies from './modules/shows-api.js';
import renderShows from './modules/render-home.js';

const startApp = async () => {
  const shows = await getMovies();
  renderShows(shows);
  commentsEventListeners();
};

startApp();
