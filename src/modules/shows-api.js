const fetchMovies = () => {
  const api = 'https://api.tvmaze.com/search/shows?q=ocean';
  const movie = fetch(api)
    .then((response) => response.json())
    .then((data) => data);
  return movie;
};

const getMovies = async () => {
  let array = await fetchMovies();
  array = array.filter((movie) => movie.show.image !== null);
  array = array.filter((movie) => movie.show.genres.length !== 0);
  const moviesArray = [];
  array.forEach((movie) => {
    moviesArray.push((movie.show));
  });
  return moviesArray;
};

const countMovies = (shows) => shows.length;

export { getMovies, countMovies };