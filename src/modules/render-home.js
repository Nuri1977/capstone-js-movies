import { getLikes, updateLikes } from './involvment-api.js';
import commentsEventListeners from './modals.js';

const renderShows = async (shows) => {
  const showsContainer = document.getElementById('shows-list');
  showsContainer.innerHTML = '';
  const resultLikes = await getLikes();

  shows.forEach(async (show) => {
    let numberLikes = 0;
    if (resultLikes === null) {
      numberLikes = 0;
    } else {
      resultLikes.forEach((element) => {
        if (element.item_id === show.id) {
          numberLikes = element.likes;
        }
      });
    }
    const listItem = `
    <li>
      <img src="${show.image.medium}" alt="${show.name} picture">
      <div class="show-info">
        <h3>${show.name}</h3>
        <div class="show-likes">
          <div class="like-div">
            <i id="${show.id}" class="far fa-heart"></i>
          </div>
          <h4><span class="likes-span">${numberLikes}</span> likes</h4>
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

  updateLikes();
};

export default renderShows;