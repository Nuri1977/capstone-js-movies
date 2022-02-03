import commentsCounter from '../test_env/commentsCounter.js';

describe('Testing comments counter', () => {
  test('Should return 1', async () => {
    expect(await commentsCounter(23051)).toBe(2);
  });
  test('Should return 0', async () => {
    expect(await commentsCounter(19558)).toBe(0);
  });
  test('Should return 3', async () => {
    expect(await commentsCounter(13263)).toBe(3);
  });
});