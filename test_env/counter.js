const fetchComments = (id) => {
  const api = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/fn8dJlnUFl6vA8TtKscd/comments?item_id=${id}`;
  const comments = fetch(api)
    .then((response) => response.json())
    .then((data) => data);
  return comments;
};

const getComments = async (id) => {
  const array = await fetchComments(id);
  if (array[0] === undefined) {
    return null;
  }
  array.sort((a, b) => a.creation_date - b.creation_date);
  return array;
};

const commentsCounter = async () => {
  const comments = await getComments();
  return comments.length;
};

export default commentsCounter;