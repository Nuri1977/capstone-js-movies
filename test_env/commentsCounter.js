import fetchComments from './fetchComments.js';

const getComments = async (id) => {
  const array = await fetchComments(id);
  if (array === undefined) {
    return [];
  }
  array.sort((a, b) => a.creation_date - b.creation_date);
  return array;
};

const commentsCounter = async (id) => {
  const comments = await getComments(id);
  return comments.length;
};

export default commentsCounter;