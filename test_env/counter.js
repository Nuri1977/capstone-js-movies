const commentsCounter = () => {
  const comments = document.querySelectorAll('.modal-comments-items');
  return comments.length;
};

export default commentsCounter;