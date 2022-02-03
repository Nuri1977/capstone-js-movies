const involId = 'fn8dJlnUFl6vA8TtKscd';
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const likeUrl = `${baseUrl}/${involId}/likes/`;

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

const postLike = (showId) => fetch(likeUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ item_id: showId }),
})
  .then((result) => result.ok);

const updateLikes = () => {
  document.querySelectorAll('.like-div').forEach((item) => {
    item.addEventListener('click', async (event) => {
      const showId = +event.target.id;
      const likesText = event.path[1].nextElementSibling.firstChild;
      postLike(showId);
      likesText.innerHTML = +likesText.textContent + 1;
    });
  });
};

export { getLikes, postLike, updateLikes };