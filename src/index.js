import './styles.css';
import getMovies from './modules/shows-api.js';
import renderShows from './modules/render-home.js';
import commentsEventListeners from './modules/modals.js';
import getLikes from './modules/involvment-api.js';

const startApp = async () => {
  const shows = await getMovies();
  renderShows(shows);
  commentsEventListeners();
};

startApp();
getLikes();
