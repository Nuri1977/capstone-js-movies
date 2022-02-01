const renderShows = (shows) => {
  const showsContainer = document.getElementById('shows-list');
  showsContainer.innerHTML = '';
  shows.forEach((show) => {
    const listItem = `
    <li>
      <img src="${show.image.medium}" alt="${show.name} picture">
      <div class="show-info">
        <h3>${show.name}</h3>
        <div class="show-likes">
          <i id="${show.id}" class="far fa-heart"></i>
          <h4>0 likes</h4>
        </div>
      </div>
      <div class="show-btn">
        <button type="button" data-id="${show.id}"  class="btn btn-comment">Comments</button>
      </div>
    </li>
    `;
    showsContainer.innerHTML += listItem;
  });
};

export default renderShows;