import {
  postComment, printComments, getComments, displayCommentsCounter,
} from './comments.js';

const displayForm = () => {
  const formDiv = document.createElement('div');
  formDiv.className = 'd-flex col';
  formDiv.id = 'form-container';
  formDiv.innerHTML = `<p id="form-title">Add a comment</p>
  <form class="d-flex col" id="comments-form">
  <input type="text" placeholder="Your name" name="name" id="form-name" maxlength="20" required>
  <textarea placeholder="Your insights" name="comment" id="form-comment" maxlength="100" required></textarea>
  <button type="submit" id="form-button">Comment</button>
  </form>
  `;

  const modal = document.getElementById('modal-container');
  modal.appendChild(formDiv);
};

const reDisplayComments = async (id, form) => {
  await postComment(id, form);
  if (document.getElementById('modal-comments')) {
    const commentsDiv = document.getElementById('modal-comments');
    commentsDiv.remove();
  }
  setTimeout(async () => {
    const comments = await getComments(id);
    printComments(comments);
    displayCommentsCounter();
  }, 1000);
};

export { displayForm, reDisplayComments };