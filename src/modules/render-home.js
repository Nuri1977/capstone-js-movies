import getLikes from './involvment-api.js';
import commentsEventListeners from './modals.js';

const renderShows = async (shows) => {
  const showsContainer = document.getElementById('shows-list');
  showsContainer.innerHTML = '';
  const resultLikes = await getLikes();

  shows.forEach(async (show) => {
    let numberLikes = 0;
    await resultLikes.forEach((element) => {
      if (element.item_id === show.id) {
        numberLikes = element.likes;
      }
    });
    const listItem = `
    <li>
      <img src="${show.image.medium}" alt="${show.name} picture">
      <div class="show-info">
        <h3>${show.name}</h3>
        <div class="show-likes">
          <i id="${show.id}" class="far fa-heart"></i>
          <h4>${numberLikes} likes</h4>
        </div>
      </div>
      <div class="show-btn">
        <button type="button" id="${show.id}"  class="btn btn-comment">Comments</button>
      </div>
    </li>
    `;
    showsContainer.innerHTML += listItem;
    commentsEventListeners();
  });
};

export default renderShows;