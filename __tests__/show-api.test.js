import { countMovies } from '../src/modules/shows-api.js';
import { shows1, shows2 } from '../test_env/moc-api.js';

describe('Testing count of movies', () => {
  test('Count of movies should be 4', () => {
    const moviesCount = countMovies(shows1);
    expect(moviesCount).toBe(4);
  });
  test('Count of movies should be 5', () => {
    const moviesCount = countMovies(shows2);
    expect(moviesCount).toBe(5);
  });
});