import { dom1comment, dom3comments, domNoComment } from '../test_env/html.js';
import commentsCounter from '../test_env/counter.js';

describe('Testing comments counter', () => {
  test('Should return 0', () => {
    document.body.innerHTML = domNoComment;
    expect(commentsCounter()).toBe(0);
  });
  test('Should return 1', () => {
    document.body.innerHTML = dom1comment;
    expect(commentsCounter()).toBe(1);
  });
  test('Should return 3', () => {
    document.body.innerHTML = dom3comments;
    expect(commentsCounter()).toBe(3);
  });
});