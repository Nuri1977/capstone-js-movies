const displayForm = () => {
  const formDiv = document.createElement('div');
  formDiv.className = 'd-flex col'
  formDiv.id = 'form-container'
  formDiv.innerHTML = `<p id="form-title">Add a new comment</p>
  <form class="d-flex col" id="comments-form">
  <input type="text" placeholder="Your name" name="name" id="form-name">
  <textarea placeholder="Your insights" name="comment" id="form-comment"></textarea>
  <button type="submit" id="form-button">Comment</button>
  </form>
  `;

  const modal = document.getElementById('modal-container');
  modal.appendChild(formDiv);

};

const reDisplayComments = async (id, form) => {
  await postComment(id, form);
  if(document.getElementById('modal-comments')){
    const commentsDiv = document.getElementById('modal-comments');
    commentsDiv.remove();
  }
  setTimeout(async ()=> {
    const comments = await getComments(id);
    printComments(comments);
  }, 1000)
};