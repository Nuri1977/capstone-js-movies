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

const printComments = (arr) => {
  const commentsDiv = document.createElement('div');
  commentsDiv.className = 'd-flex col';
  commentsDiv.id = 'modal-comments';

  if (arr === null) {
    commentsDiv.innerHTML = `<p class="modal-comments-title">Comments (0)</p>
    <p class="modal-comments-items">No comments...</p>`;
  } else {
    commentsDiv.innerHTML = `<p class="modal-comments-title">Comments (${arr.length})</p>`;
    arr.forEach((comment) => {
      const item = document.createElement('p');
      item.className = 'modal-comments-items';
      item.innerHTML = `${comment.creation_date} ${comment.username} ${comment.comment}`;
      commentsDiv.appendChild(item);
    });
  }
  const formDiv = document.getElementById('form-container');
  const modal = document.getElementById('modal-container');
  modal.insertBefore(commentsDiv, formDiv);
};

const displayComments = async (id) => {
  const comments = await getComments(id);
  printComments(comments);
};

export default displayComments;