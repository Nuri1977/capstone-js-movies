const involId = 'fn8dJlnUFl6vA8TtKscd';
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const likeUrl = `${baseUrl}/${involId}/likes/`;

/*
const getLikes = () => fetch(likeUrl)
  .then((result) => result.json());

export default getLikes;
*/

const fetchLikes = () => {
  const api = likeUrl;
  const likes = fetch(api)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return likes;
};

const getLikes = async () => {
  const likes = await fetchLikes();
  if (likes[0] === undefined) {
    return null;
  }
  return likes;
};

export default getLikes;