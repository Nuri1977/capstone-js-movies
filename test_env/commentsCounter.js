import fetchComments from './fetchComments.js';

/* const fetchComments = (id) => {
  const api = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GyD6IeGQTLsQHkMJifVd/comments?item_id=${id}`;
  const comments = fetch(api)
    .then((response) => response.json())
    .then((data) => data);
  return comments;
}; */

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