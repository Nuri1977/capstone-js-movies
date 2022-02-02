/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/comments.js":
/*!*********************************!*\
  !*** ./src/modules/comments.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayComments": () => (/* binding */ displayComments),
/* harmony export */   "postComment": () => (/* binding */ postComment),
/* harmony export */   "printComments": () => (/* binding */ printComments),
/* harmony export */   "getComments": () => (/* binding */ getComments),
/* harmony export */   "displayCommentsCounter": () => (/* binding */ displayCommentsCounter)
/* harmony export */ });
const postCommentApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/fn8dJlnUFl6vA8TtKscd/comments';

const fetchComments = id => {
  const api = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/fn8dJlnUFl6vA8TtKscd/comments?item_id=${id}`;
  const comments = fetch(api).then(response => response.json()).then(data => data);
  return comments;
};

const postComment = async (id, form) => {
  const name = form.name.value;
  const comment = form.comment.value;
  await fetch(postCommentApi, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      item_id: id,
      username: name,
      comment
    })
  }).then(() => {});
};

const getComments = async id => {
  const array = await fetchComments(id);

  if (array[0] === undefined) {
    return null;
  }

  array.sort((a, b) => a.creation_date - b.creation_date);
  return array;
};

const printComments = arr => {
  const commentsDiv = document.createElement('div');
  commentsDiv.className = 'd-flex col';
  commentsDiv.id = 'modal-comments';

  if (arr === null) {
    commentsDiv.innerHTML = `<p class="modal-comments-title">Comments (0)</p>
    <p class="modal-no-comments">No comments...</p>`;
  } else {
    commentsDiv.innerHTML = `<p class="modal-comments-title">Comments (${arr.length})</p>`;
    arr.forEach(comment => {
      const item = document.createElement('p');
      item.className = 'modal-comments-items';
      item.innerHTML = `<span class="comment-date">${comment.creation_date}</span> <span class="comment-username">${comment.username}:</span> ${comment.comment}`;
      commentsDiv.appendChild(item);
    });
  }

  const formDiv = document.getElementById('form-container');
  const modal = document.getElementById('modal-container');
  modal.insertBefore(commentsDiv, formDiv);
};

const commentsCounter = async () => {
  const comments = await getComments();
  return comments.length;
};

const displayCommentsCounter = async () => {
  const commentsNumber = await commentsCounter();
  const title = document.querySelector('.modal-comments-title');
  title.textContent = `Comments (${commentsNumber})`;
};

const displayComments = async id => {
  const comments = await getComments(id);
  printComments(comments);
  displayCommentsCounter();
};



/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayForm": () => (/* binding */ displayForm),
/* harmony export */   "reDisplayComments": () => (/* binding */ reDisplayComments)
/* harmony export */ });
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.js */ "./src/modules/comments.js");


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
  await (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.postComment)(id, form);

  if (document.getElementById('modal-comments')) {
    const commentsDiv = document.getElementById('modal-comments');
    commentsDiv.remove();
  }

  setTimeout(async () => {
    const comments = await (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.getComments)(id);
    (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.printComments)(comments);
    (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.displayCommentsCounter)();
  }, 1000);
};



/***/ }),

/***/ "./src/modules/involvment-api.js":
/*!***************************************!*\
  !*** ./src/modules/involvment-api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "postLike": () => (/* binding */ postLike),
/* harmony export */   "updateLikes": () => (/* binding */ updateLikes)
/* harmony export */ });
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
  const likes = fetch(api).then(response => response.json()).then(data => data).catch(error => error);
  return likes;
};

const getLikes = async () => {
  const likes = await fetchLikes();

  if (likes[0] === undefined) {
    return null;
  }

  return likes;
};

const postLike = showId => fetch(likeUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    item_id: showId
  })
}).then(result => result.ok);

const updateLikes = () => {
  document.querySelectorAll('.like-div').forEach(item => {
    item.addEventListener('click', async event => {
      const showId = +event.target.id;
      const likesText = event.path[1].nextElementSibling.firstChild;
      postLike(showId);
      likesText.innerHTML = +likesText.textContent + 1;
    });
  });
};



/***/ }),

/***/ "./src/modules/modals.js":
/*!*******************************!*\
  !*** ./src/modules/modals.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shows_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shows-api.js */ "./src/modules/shows-api.js");
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments.js */ "./src/modules/comments.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.js */ "./src/modules/form.js");




const createModalHTML = movie => {
  const {
    name,
    summary,
    premiered,
    genres,
    language,
    image: {
      medium
    }
  } = movie;
  const img = medium;
  const modal = document.createElement('div');
  modal.className = 'modal d-flex col';
  modal.innerHTML = `<div class="modal-container d-flex col" id="modal-container">
  <div  id='modal-close-btn' class="click"><i class="fas fa-times"></i></div>
  <img src="${img}" alt="${name} image" class="modal-img">
  <h2 class="modal-title">${name}</h2>
  <div class="modal-info-line1 d-flex">
  <div class="d-flex"><p class="modal-info-title">Language:</p><p class="modal-info">${language}</p></div>
  <div class="d-flex"><p class="modal-info-title">Premiered:</p><p class="modal-info">${premiered}</p></div>
  </div>
  <div class="modal-info-line2 d-flex">
  <p class="modal-info-title">Genres:</p><ul class="modal-info" id="genres-list"></ul>
  </div>
  <div class="modal-summary d-flex col">
  <p class="modal-info-title">Summary:</p>
  ${summary}
  </div>
  </div>`;
  const body = document.getElementById('body');
  body.appendChild(modal);
  const genresList = document.getElementById('genres-list');
  genres.forEach(genre => {
    const li = document.createElement('li');
    li.innerHTML = `${genre}`;
    genresList.appendChild(li);
  });
};

const filterMovie = async id => {
  const movies = await (0,_shows_api_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const movie = movies.filter(movie => movie.id === id);
  return movie;
};

const preventScroll = () => {
  const body = document.getElementById('body');
  body.classList.add('no-scroll');
};

const allowScroll = () => {
  const body = document.getElementById('body');
  body.classList.remove('no-scroll');
};

const closeModal = node => {
  node.parentNode.parentNode.remove();
  allowScroll();
};

const modalEventListeners = id => {
  const close = document.querySelector('#modal-close-btn');
  close.addEventListener('click', () => {
    closeModal(close);
  });
  const form = document.getElementById('comments-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    await (0,_form_js__WEBPACK_IMPORTED_MODULE_2__.reDisplayComments)(id, form);
  });
};

const createModal = async id => {
  const movie = await filterMovie(id);
  createModalHTML(movie[0]);
  (0,_form_js__WEBPACK_IMPORTED_MODULE_2__.displayForm)();
  (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.displayComments)(id);
  modalEventListeners(id);
};

const commentsEventListeners = () => {
  const buttons = document.querySelectorAll('.btn-comment');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      createModal(+button.id);
      preventScroll();
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commentsEventListeners);

/***/ }),

/***/ "./src/modules/render-home.js":
/*!************************************!*\
  !*** ./src/modules/render-home.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _involvment_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./involvment-api.js */ "./src/modules/involvment-api.js");
/* harmony import */ var _modals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals.js */ "./src/modules/modals.js");



const renderShows = async shows => {
  const showsContainer = document.getElementById('shows-list');
  showsContainer.innerHTML = '';
  const resultLikes = await (0,_involvment_api_js__WEBPACK_IMPORTED_MODULE_0__.getLikes)();
  shows.forEach(async show => {
    let numberLikes = 0;

    if (resultLikes === null) {
      numberLikes = 0;
    } else {
      resultLikes.forEach(element => {
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
    (0,_modals_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  });
  (0,_involvment_api_js__WEBPACK_IMPORTED_MODULE_0__.updateLikes)();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderShows);

/***/ }),

/***/ "./src/modules/shows-api.js":
/*!**********************************!*\
  !*** ./src/modules/shows-api.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const fetchMovies = () => {
  const api = 'https://api.tvmaze.com/search/shows?q=ocean';
  const movie = fetch(api).then(response => response.json()).then(data => data);
  return movie;
};

const getMovies = async () => {
  let array = await fetchMovies();
  array = array.filter(movie => movie.show.image !== null);
  array = array.filter(movie => movie.show.genres.length !== 0);
  const moviesArray = [];
  array.forEach(movie => {
    moviesArray.push(movie.show);
  });
  return moviesArray;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getMovies);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\r\n*::after,\r\n*::before {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n:root {\r\n  --primary: #272a31;\r\n  --secondary: #ec5242;\r\n  --terciary: #d3d3d3;\r\n  --brand: #d23228;\r\n  --success: #0d7d4d;\r\n  --info: #03c7e8;\r\n  --warning: #f0cc00;\r\n  --danger: #ab0d02;\r\n  --light: #f1ecea;\r\n  --dark: #00262b;\r\n  --white: #fff;\r\n  --poppins-font: 'Poppins', sans-serif;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  font-family: var(--poppins-font);\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n}\r\n\r\na,\r\na::after,\r\na:visited,\r\na:active,\r\na:hover {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.col {\r\n  flex-direction: column;\r\n}\r\n\r\n#header {\r\n  width: 100%;\r\n  margin-top: 15px;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  gap: 30px;\r\n  font-size: 30px;\r\n}\r\n\r\n#logo {\r\n  font-size: 40px;\r\n}\r\n\r\n#nav-bar {\r\n  gap: 30px;\r\n}\r\n\r\n.active {\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.container {\r\n  max-width: 80%;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n}\r\n\r\n.credits {\r\n  padding: 30px;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.credits-name {\r\n  color: var(--brand);\r\n}\r\n\r\n.left {\r\n  text-align: left;\r\n}\r\n\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: rgba(43, 209, 21, 0);\r\n  align-items: center;\r\n  justify-self: center;\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  overflow: auto;\r\n}\r\n\r\n.modal-container {\r\n  position: relative;\r\n  width: 70%;\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  align-items: center;\r\n  justify-self: center;\r\n  background-color: white;\r\n  padding: 20px;\r\n  border: solid 1px black;\r\n}\r\n\r\n#modal-close-btn {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 20px;\r\n  font-size: 50px;\r\n}\r\n\r\n.modal-container ul {\r\n  list-style: disc;\r\n}\r\n\r\n.modal-info-line1 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-line1 > div {\r\n  gap: 5px;\r\n}\r\n\r\n.modal-info-line2 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-title {\r\n  font-weight: bold;\r\n}\r\n\r\n#modal-comments {\r\n  align-items: center;\r\n  gap: 5px;\r\n  padding: 20px 0;\r\n}\r\n\r\n/* SECTION SHOWS */\r\n.main-shows {\r\n  background-color: var(--white);\r\n}\r\n\r\n.shows-list {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr;\r\n  gap: 50px;\r\n  padding: 24px 0;\r\n}\r\n\r\n.shows-list li img {\r\n  width: 100%;\r\n  border-radius: 5px;\r\n}\r\n\r\n.show-info {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.show-likes {\r\n  padding: 0 10px;\r\n  text-align: right;\r\n}\r\n\r\n.show-btn {\r\n  text-align: center;\r\n}\r\n\r\n.btn {\r\n  background-color: var(--primary);\r\n  color: var(--terciary);\r\n  padding: 10px;\r\n  border-radius: 2px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.comment-date {\r\n  font-style: italic;\r\n}\r\n\r\n.comment-username {\r\n  font-weight: bold;\r\n  padding: 0 5px;\r\n}\r\n\r\n.click {\r\n  cursor: pointer;\r\n}\r\n\r\n.no-scroll {\r\n  overflow: hidden;\r\n}\r\n\r\ntextarea {\r\n  resize: none;\r\n}\r\n\r\n#form-container {\r\n  align-items: center;\r\n  gap: 5px;\r\n  width: 50%;\r\n}\r\n\r\n#comments-form {\r\n  width: 100%;\r\n  gap: 5px;\r\n}\r\n\r\n#form-name {\r\n  width: 50%;\r\n  padding: 5px;\r\n}\r\n\r\n#form-comment {\r\n  width: 100%;\r\n  height: 100px;\r\n  padding: 5px;\r\n}\r\n\r\n#form-button {\r\n  width: 30%;\r\n}\r\n\r\n#form-name,\r\n#form-comment,\r\n#form-button {\r\n  font-family: var(--poppins-font);\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAEA;;;EAGE,8BAA8B;EAC9B,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;EACf,aAAa;EACb,qCAAqC;AACvC;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,cAAc;EACd,wBAAwB;AAC1B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,2BAA2B;EAC3B,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,YAAY;AACd;;AAEA;EACE,WAAW;EACX,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,sCAAsC;EACtC,mBAAmB;EACnB,oBAAoB;EACpB,0BAA0B;EAC1B,kCAAkC;EAClC,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,QAAQ;EACR,eAAe;AACjB;;AAEA,kBAAkB;AAClB;EACE,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gCAAgC;EAChC,sBAAsB;EACtB,aAAa;EACb,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,QAAQ;EACR,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,QAAQ;AACV;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,WAAW;EACX,aAAa;EACb,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA;;;EAGE,gCAAgC;AAClC","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins');\r\n\r\n*,\r\n*::after,\r\n*::before {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n:root {\r\n  --primary: #272a31;\r\n  --secondary: #ec5242;\r\n  --terciary: #d3d3d3;\r\n  --brand: #d23228;\r\n  --success: #0d7d4d;\r\n  --info: #03c7e8;\r\n  --warning: #f0cc00;\r\n  --danger: #ab0d02;\r\n  --light: #f1ecea;\r\n  --dark: #00262b;\r\n  --white: #fff;\r\n  --poppins-font: 'Poppins', sans-serif;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  font-family: var(--poppins-font);\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n}\r\n\r\na,\r\na::after,\r\na:visited,\r\na:active,\r\na:hover {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.col {\r\n  flex-direction: column;\r\n}\r\n\r\n#header {\r\n  width: 100%;\r\n  margin-top: 15px;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  gap: 30px;\r\n  font-size: 30px;\r\n}\r\n\r\n#logo {\r\n  font-size: 40px;\r\n}\r\n\r\n#nav-bar {\r\n  gap: 30px;\r\n}\r\n\r\n.active {\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.container {\r\n  max-width: 80%;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n}\r\n\r\n.credits {\r\n  padding: 30px;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.credits-name {\r\n  color: var(--brand);\r\n}\r\n\r\n.left {\r\n  text-align: left;\r\n}\r\n\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: rgba(43, 209, 21, 0);\r\n  align-items: center;\r\n  justify-self: center;\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  overflow: auto;\r\n}\r\n\r\n.modal-container {\r\n  position: relative;\r\n  width: 70%;\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  align-items: center;\r\n  justify-self: center;\r\n  background-color: white;\r\n  padding: 20px;\r\n  border: solid 1px black;\r\n}\r\n\r\n#modal-close-btn {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 20px;\r\n  font-size: 50px;\r\n}\r\n\r\n.modal-container ul {\r\n  list-style: disc;\r\n}\r\n\r\n.modal-info-line1 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-line1 > div {\r\n  gap: 5px;\r\n}\r\n\r\n.modal-info-line2 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-title {\r\n  font-weight: bold;\r\n}\r\n\r\n#modal-comments {\r\n  align-items: center;\r\n  gap: 5px;\r\n  padding: 20px 0;\r\n}\r\n\r\n/* SECTION SHOWS */\r\n.main-shows {\r\n  background-color: var(--white);\r\n}\r\n\r\n.shows-list {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr;\r\n  gap: 50px;\r\n  padding: 24px 0;\r\n}\r\n\r\n.shows-list li img {\r\n  width: 100%;\r\n  border-radius: 5px;\r\n}\r\n\r\n.show-info {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.show-likes {\r\n  padding: 0 10px;\r\n  text-align: right;\r\n}\r\n\r\n.show-btn {\r\n  text-align: center;\r\n}\r\n\r\n.btn {\r\n  background-color: var(--primary);\r\n  color: var(--terciary);\r\n  padding: 10px;\r\n  border-radius: 2px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.comment-date {\r\n  font-style: italic;\r\n}\r\n\r\n.comment-username {\r\n  font-weight: bold;\r\n  padding: 0 5px;\r\n}\r\n\r\n.click {\r\n  cursor: pointer;\r\n}\r\n\r\n.no-scroll {\r\n  overflow: hidden;\r\n}\r\n\r\ntextarea {\r\n  resize: none;\r\n}\r\n\r\n#form-container {\r\n  align-items: center;\r\n  gap: 5px;\r\n  width: 50%;\r\n}\r\n\r\n#comments-form {\r\n  width: 100%;\r\n  gap: 5px;\r\n}\r\n\r\n#form-name {\r\n  width: 50%;\r\n  padding: 5px;\r\n}\r\n\r\n#form-comment {\r\n  width: 100%;\r\n  height: 100px;\r\n  padding: 5px;\r\n}\r\n\r\n#form-button {\r\n  width: 30%;\r\n}\r\n\r\n#form-name,\r\n#form-comment,\r\n#form-button {\r\n  font-family: var(--poppins-font);\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _modules_shows_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/shows-api.js */ "./src/modules/shows-api.js");
/* harmony import */ var _modules_render_home_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/render-home.js */ "./src/modules/render-home.js");
/* harmony import */ var _modules_modals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modals.js */ "./src/modules/modals.js");





const startApp = async () => {
  const shows = await (0,_modules_shows_api_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_render_home_js__WEBPACK_IMPORTED_MODULE_2__["default"])(shows);
  (0,_modules_modals_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
};

startApp();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dUNBQXVDLEtBQUssV0FBVyxtRkFBbUYsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxTQUFTLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsT0FBTyxZQUFZLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxV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O0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNMEMsUUFBUSxHQUFHLFlBQVk7QUFDM0IsUUFBTVYsS0FBSyxHQUFHLE1BQU1oQyxpRUFBUyxFQUE3QjtBQUNBK0IsRUFBQUEsbUVBQVcsQ0FBQ0MsS0FBRCxDQUFYO0FBQ0FKLEVBQUFBLDhEQUFzQjtBQUN2QixDQUpEOztBQU1BYyxRQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ludm9sdm1lbnQtYXBpLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9tb2RhbHMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL3JlbmRlci1ob21lLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9zaG93cy1hcGkuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcG9zdENvbW1lbnRBcGkgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvZm44ZEpsblVGbDZ2QThUdEtzY2QvY29tbWVudHMnO1xyXG5cclxuY29uc3QgZmV0Y2hDb21tZW50cyA9IChpZCkgPT4ge1xyXG4gIGNvbnN0IGFwaSA9IGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9mbjhkSmxuVUZsNnZBOFR0S3NjZC9jb21tZW50cz9pdGVtX2lkPSR7aWR9YDtcclxuICBjb25zdCBjb21tZW50cyA9IGZldGNoKGFwaSlcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xyXG4gIHJldHVybiBjb21tZW50cztcclxufTtcclxuXHJcbmNvbnN0IHBvc3RDb21tZW50ID0gYXN5bmMgKGlkLCBmb3JtKSA9PiB7XHJcbiAgY29uc3QgbmFtZSA9IGZvcm0ubmFtZS52YWx1ZTtcclxuICBjb25zdCBjb21tZW50ID0gZm9ybS5jb21tZW50LnZhbHVlO1xyXG4gIGF3YWl0IGZldGNoKHBvc3RDb21tZW50QXBpLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcclxuICAgIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGl0ZW1faWQ6IGlkLFxyXG4gICAgICB1c2VybmFtZTogbmFtZSxcclxuICAgICAgY29tbWVudCxcclxuICAgIH0pLFxyXG4gIH0pXHJcbiAgICAudGhlbigoKSA9PiB7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgY29uc3QgYXJyYXkgPSBhd2FpdCBmZXRjaENvbW1lbnRzKGlkKTtcclxuICBpZiAoYXJyYXlbMF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGFycmF5LnNvcnQoKGEsIGIpID0+IGEuY3JlYXRpb25fZGF0ZSAtIGIuY3JlYXRpb25fZGF0ZSk7XHJcbiAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuY29uc3QgcHJpbnRDb21tZW50cyA9IChhcnIpID0+IHtcclxuICBjb25zdCBjb21tZW50c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbW1lbnRzRGl2LmNsYXNzTmFtZSA9ICdkLWZsZXggY29sJztcclxuICBjb21tZW50c0Rpdi5pZCA9ICdtb2RhbC1jb21tZW50cyc7XHJcblxyXG4gIGlmIChhcnIgPT09IG51bGwpIHtcclxuICAgIGNvbW1lbnRzRGl2LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cIm1vZGFsLWNvbW1lbnRzLXRpdGxlXCI+Q29tbWVudHMgKDApPC9wPlxyXG4gICAgPHAgY2xhc3M9XCJtb2RhbC1uby1jb21tZW50c1wiPk5vIGNvbW1lbnRzLi4uPC9wPmA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbW1lbnRzRGl2LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cIm1vZGFsLWNvbW1lbnRzLXRpdGxlXCI+Q29tbWVudHMgKCR7YXJyLmxlbmd0aH0pPC9wPmA7XHJcbiAgICBhcnIuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBpdGVtLmNsYXNzTmFtZSA9ICdtb2RhbC1jb21tZW50cy1pdGVtcyc7XHJcbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtjb21tZW50LmNyZWF0aW9uX2RhdGV9PC9zcGFuPiA8c3BhbiBjbGFzcz1cImNvbW1lbnQtdXNlcm5hbWVcIj4ke2NvbW1lbnQudXNlcm5hbWV9Ojwvc3Bhbj4gJHtjb21tZW50LmNvbW1lbnR9YDtcclxuICAgICAgY29tbWVudHNEaXYuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY29uc3QgZm9ybURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWNvbnRhaW5lcicpO1xyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWNvbnRhaW5lcicpO1xyXG4gIG1vZGFsLmluc2VydEJlZm9yZShjb21tZW50c0RpdiwgZm9ybURpdik7XHJcbn07XHJcblxyXG5jb25zdCBjb21tZW50c0NvdW50ZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cygpO1xyXG4gIHJldHVybiBjb21tZW50cy5sZW5ndGg7XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tbWVudHNDb3VudGVyID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGNvbW1lbnRzTnVtYmVyID0gYXdhaXQgY29tbWVudHNDb3VudGVyKCk7XHJcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29tbWVudHMtdGl0bGUnKTtcclxuICB0aXRsZS50ZXh0Q29udGVudCA9IGBDb21tZW50cyAoJHtjb21tZW50c051bWJlcn0pYDtcclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlDb21tZW50cyA9IGFzeW5jIChpZCkgPT4ge1xyXG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHMoaWQpO1xyXG4gIHByaW50Q29tbWVudHMoY29tbWVudHMpO1xyXG4gIGRpc3BsYXlDb21tZW50c0NvdW50ZXIoKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgZGlzcGxheUNvbW1lbnRzLCBwb3N0Q29tbWVudCxcclxuICBwcmludENvbW1lbnRzLCBnZXRDb21tZW50cyxcclxuICBkaXNwbGF5Q29tbWVudHNDb3VudGVyLFxyXG59OyIsImltcG9ydCB7XHJcbiAgcG9zdENvbW1lbnQsIHByaW50Q29tbWVudHMsIGdldENvbW1lbnRzLCBkaXNwbGF5Q29tbWVudHNDb3VudGVyLFxyXG59IGZyb20gJy4vY29tbWVudHMuanMnO1xyXG5cclxuY29uc3QgZGlzcGxheUZvcm0gPSAoKSA9PiB7XHJcbiAgY29uc3QgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGZvcm1EaXYuY2xhc3NOYW1lID0gJ2QtZmxleCBjb2wnO1xyXG4gIGZvcm1EaXYuaWQgPSAnZm9ybS1jb250YWluZXInO1xyXG4gIGZvcm1EaXYuaW5uZXJIVE1MID0gYDxwIGlkPVwiZm9ybS10aXRsZVwiPkFkZCBhIGNvbW1lbnQ8L3A+XHJcbiAgPGZvcm0gY2xhc3M9XCJkLWZsZXggY29sXCIgaWQ9XCJjb21tZW50cy1mb3JtXCI+XHJcbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIiBuYW1lPVwibmFtZVwiIGlkPVwiZm9ybS1uYW1lXCIgbWF4bGVuZ3RoPVwiMjBcIiByZXF1aXJlZD5cclxuICA8dGV4dGFyZWEgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzXCIgbmFtZT1cImNvbW1lbnRcIiBpZD1cImZvcm0tY29tbWVudFwiIG1heGxlbmd0aD1cIjEwMFwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XHJcbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJmb3JtLWJ1dHRvblwiPkNvbW1lbnQ8L2J1dHRvbj5cclxuICA8L2Zvcm0+XHJcbiAgYDtcclxuXHJcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtY29udGFpbmVyJyk7XHJcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoZm9ybURpdik7XHJcbn07XHJcblxyXG5jb25zdCByZURpc3BsYXlDb21tZW50cyA9IGFzeW5jIChpZCwgZm9ybSkgPT4ge1xyXG4gIGF3YWl0IHBvc3RDb21tZW50KGlkLCBmb3JtKTtcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWNvbW1lbnRzJykpIHtcclxuICAgIGNvbnN0IGNvbW1lbnRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWNvbW1lbnRzJyk7XHJcbiAgICBjb21tZW50c0Rpdi5yZW1vdmUoKTtcclxuICB9XHJcbiAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnRzKGlkKTtcclxuICAgIHByaW50Q29tbWVudHMoY29tbWVudHMpO1xyXG4gICAgZGlzcGxheUNvbW1lbnRzQ291bnRlcigpO1xyXG4gIH0sIDEwMDApO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZGlzcGxheUZvcm0sIHJlRGlzcGxheUNvbW1lbnRzIH07IiwiY29uc3QgaW52b2xJZCA9ICdmbjhkSmxuVUZsNnZBOFR0S3NjZCc7XHJcbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMnO1xyXG5jb25zdCBsaWtlVXJsID0gYCR7YmFzZVVybH0vJHtpbnZvbElkfS9saWtlcy9gO1xyXG5cclxuLypcclxuY29uc3QgZ2V0TGlrZXMgPSAoKSA9PiBmZXRjaChsaWtlVXJsKVxyXG4gIC50aGVuKChyZXN1bHQpID0+IHJlc3VsdC5qc29uKCkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0TGlrZXM7XHJcbiovXHJcblxyXG5jb25zdCBmZXRjaExpa2VzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGFwaSA9IGxpa2VVcmw7XHJcbiAgY29uc3QgbGlrZXMgPSBmZXRjaChhcGkpXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiBkYXRhKVxyXG4gICAgLmNhdGNoKChlcnJvcikgPT4gZXJyb3IpO1xyXG4gIHJldHVybiBsaWtlcztcclxufTtcclxuXHJcbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGxpa2VzID0gYXdhaXQgZmV0Y2hMaWtlcygpO1xyXG4gIGlmIChsaWtlc1swXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIGxpa2VzO1xyXG59O1xyXG5cclxuY29uc3QgcG9zdExpa2UgPSAoc2hvd0lkKSA9PiBmZXRjaChsaWtlVXJsLCB7XHJcbiAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICB9LFxyXG4gIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgaXRlbV9pZDogc2hvd0lkIH0pLFxyXG59KVxyXG4gIC50aGVuKChyZXN1bHQpID0+IHJlc3VsdC5vayk7XHJcblxyXG5jb25zdCB1cGRhdGVMaWtlcyA9ICgpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZS1kaXYnKS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNob3dJZCA9ICtldmVudC50YXJnZXQuaWQ7XHJcbiAgICAgIGNvbnN0IGxpa2VzVGV4dCA9IGV2ZW50LnBhdGhbMV0ubmV4dEVsZW1lbnRTaWJsaW5nLmZpcnN0Q2hpbGQ7XHJcbiAgICAgIHBvc3RMaWtlKHNob3dJZCk7XHJcbiAgICAgIGxpa2VzVGV4dC5pbm5lckhUTUwgPSArbGlrZXNUZXh0LnRleHRDb250ZW50ICsgMTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlLCB1cGRhdGVMaWtlcyB9OyIsImltcG9ydCBnZXRNb3ZpZXMgZnJvbSAnLi9zaG93cy1hcGkuanMnO1xyXG5pbXBvcnQgeyBkaXNwbGF5Q29tbWVudHMgfSBmcm9tICcuL2NvbW1lbnRzLmpzJztcclxuaW1wb3J0IHsgZGlzcGxheUZvcm0sIHJlRGlzcGxheUNvbW1lbnRzIH0gZnJvbSAnLi9mb3JtLmpzJztcclxuXHJcbmNvbnN0IGNyZWF0ZU1vZGFsSFRNTCA9IChtb3ZpZSkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIG5hbWUsIHN1bW1hcnksIHByZW1pZXJlZCxcclxuICAgIGdlbnJlcywgbGFuZ3VhZ2UsIGltYWdlOiB7IG1lZGl1bSB9LFxyXG4gIH0gPSBtb3ZpZTtcclxuXHJcbiAgY29uc3QgaW1nID0gbWVkaXVtO1xyXG5cclxuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1vZGFsLmNsYXNzTmFtZSA9ICdtb2RhbCBkLWZsZXggY29sJztcclxuXHJcbiAgbW9kYWwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXIgZC1mbGV4IGNvbFwiIGlkPVwibW9kYWwtY29udGFpbmVyXCI+XHJcbiAgPGRpdiAgaWQ9J21vZGFsLWNsb3NlLWJ0bicgY2xhc3M9XCJjbGlja1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPjwvZGl2PlxyXG4gIDxpbWcgc3JjPVwiJHtpbWd9XCIgYWx0PVwiJHtuYW1lfSBpbWFnZVwiIGNsYXNzPVwibW9kYWwtaW1nXCI+XHJcbiAgPGgyIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4ke25hbWV9PC9oMj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaW5mby1saW5lMSBkLWZsZXhcIj5cclxuICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+PHAgY2xhc3M9XCJtb2RhbC1pbmZvLXRpdGxlXCI+TGFuZ3VhZ2U6PC9wPjxwIGNsYXNzPVwibW9kYWwtaW5mb1wiPiR7bGFuZ3VhZ2V9PC9wPjwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj48cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5QcmVtaWVyZWQ6PC9wPjxwIGNsYXNzPVwibW9kYWwtaW5mb1wiPiR7cHJlbWllcmVkfTwvcD48L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaW5mby1saW5lMiBkLWZsZXhcIj5cclxuICA8cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5HZW5yZXM6PC9wPjx1bCBjbGFzcz1cIm1vZGFsLWluZm9cIiBpZD1cImdlbnJlcy1saXN0XCI+PC91bD5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtc3VtbWFyeSBkLWZsZXggY29sXCI+XHJcbiAgPHAgY2xhc3M9XCJtb2RhbC1pbmZvLXRpdGxlXCI+U3VtbWFyeTo8L3A+XHJcbiAgJHtzdW1tYXJ5fVxyXG4gIDwvZGl2PlxyXG4gIDwvZGl2PmA7XHJcblxyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xyXG4gIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG5cclxuICBjb25zdCBnZW5yZXNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlbnJlcy1saXN0Jyk7XHJcbiAgZ2VucmVzLmZvckVhY2goKGdlbnJlKSA9PiB7XHJcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBsaS5pbm5lckhUTUwgPSBgJHtnZW5yZX1gO1xyXG4gICAgZ2VucmVzTGlzdC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBmaWx0ZXJNb3ZpZSA9IGFzeW5jIChpZCkgPT4ge1xyXG4gIGNvbnN0IG1vdmllcyA9IGF3YWl0IGdldE1vdmllcygpO1xyXG4gIGNvbnN0IG1vdmllID0gbW92aWVzLmZpbHRlcigobW92aWUpID0+IG1vdmllLmlkID09PSBpZCk7XHJcbiAgcmV0dXJuIG1vdmllO1xyXG59O1xyXG5cclxuY29uc3QgcHJldmVudFNjcm9sbCA9ICgpID0+IHtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKTtcclxuICBib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXNjcm9sbCcpO1xyXG59O1xyXG5cclxuY29uc3QgYWxsb3dTY3JvbGwgPSAoKSA9PiB7XHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XHJcbiAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1zY3JvbGwnKTtcclxufTtcclxuXHJcbmNvbnN0IGNsb3NlTW9kYWwgPSAobm9kZSkgPT4ge1xyXG4gIG5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gIGFsbG93U2Nyb2xsKCk7XHJcbn07XHJcblxyXG5jb25zdCBtb2RhbEV2ZW50TGlzdGVuZXJzID0gKGlkKSA9PiB7XHJcbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtY2xvc2UtYnRuJyk7XHJcbiAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjbG9zZU1vZGFsKGNsb3NlKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy1mb3JtJyk7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgYXdhaXQgcmVEaXNwbGF5Q29tbWVudHMoaWQsIGZvcm0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlTW9kYWwgPSBhc3luYyAoaWQpID0+IHtcclxuICBjb25zdCBtb3ZpZSA9IGF3YWl0IGZpbHRlck1vdmllKGlkKTtcclxuICBjcmVhdGVNb2RhbEhUTUwobW92aWVbMF0pO1xyXG4gIGRpc3BsYXlGb3JtKCk7XHJcbiAgZGlzcGxheUNvbW1lbnRzKGlkKTtcclxuICBtb2RhbEV2ZW50TGlzdGVuZXJzKGlkKTtcclxufTtcclxuXHJcbmNvbnN0IGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XHJcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tY29tbWVudCcpO1xyXG4gIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGNyZWF0ZU1vZGFsKCtidXR0b24uaWQpO1xyXG4gICAgICBwcmV2ZW50U2Nyb2xsKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnM7IiwiaW1wb3J0IHsgZ2V0TGlrZXMsIHVwZGF0ZUxpa2VzIH0gZnJvbSAnLi9pbnZvbHZtZW50LWFwaS5qcyc7XHJcbmltcG9ydCBjb21tZW50c0V2ZW50TGlzdGVuZXJzIGZyb20gJy4vbW9kYWxzLmpzJztcclxuXHJcbmNvbnN0IHJlbmRlclNob3dzID0gYXN5bmMgKHNob3dzKSA9PiB7XHJcbiAgY29uc3Qgc2hvd3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd3MtbGlzdCcpO1xyXG4gIHNob3dzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gIGNvbnN0IHJlc3VsdExpa2VzID0gYXdhaXQgZ2V0TGlrZXMoKTtcclxuXHJcbiAgc2hvd3MuZm9yRWFjaChhc3luYyAoc2hvdykgPT4ge1xyXG4gICAgbGV0IG51bWJlckxpa2VzID0gMDtcclxuICAgIGlmIChyZXN1bHRMaWtlcyA9PT0gbnVsbCkge1xyXG4gICAgICBudW1iZXJMaWtlcyA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHRMaWtlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaXRlbV9pZCA9PT0gc2hvdy5pZCkge1xyXG4gICAgICAgICAgbnVtYmVyTGlrZXMgPSBlbGVtZW50Lmxpa2VzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsaXN0SXRlbSA9IGBcclxuICAgIDxsaT5cclxuICAgICAgPGltZyBzcmM9XCIke3Nob3cuaW1hZ2UubWVkaXVtfVwiIGFsdD1cIiR7c2hvdy5uYW1lfSBwaWN0dXJlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWluZm9cIj5cclxuICAgICAgICA8aDM+JHtzaG93Lm5hbWV9PC9oMz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdy1saWtlc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpa2UtZGl2XCI+XHJcbiAgICAgICAgICAgIDxpIGlkPVwiJHtzaG93LmlkfVwiIGNsYXNzPVwiZmFyIGZhLWhlYXJ0XCI+PC9pPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8aDQ+PHNwYW4gY2xhc3M9XCJsaWtlcy1zcGFuXCI+JHtudW1iZXJMaWtlc308L3NwYW4+IGxpa2VzPC9oND5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWJ0blwiPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiJHtzaG93LmlkfVwiICBjbGFzcz1cImJ0biBidG4tY29tbWVudFwiPkNvbW1lbnRzPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9saT5cclxuICAgIGA7XHJcbiAgICBzaG93c0NvbnRhaW5lci5pbm5lckhUTUwgKz0gbGlzdEl0ZW07XHJcblxyXG4gICAgY29tbWVudHNFdmVudExpc3RlbmVycygpO1xyXG4gIH0pO1xyXG5cclxuICB1cGRhdGVMaWtlcygpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyU2hvd3M7IiwiY29uc3QgZmV0Y2hNb3ZpZXMgPSAoKSA9PiB7XG4gIGNvbnN0IGFwaSA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3NlYXJjaC9zaG93cz9xPW9jZWFuJztcbiAgY29uc3QgbW92aWUgPSBmZXRjaChhcGkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xuICByZXR1cm4gbW92aWU7XG59O1xuXG5jb25zdCBnZXRNb3ZpZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBhcnJheSA9IGF3YWl0IGZldGNoTW92aWVzKCk7XG4gIGFycmF5ID0gYXJyYXkuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuc2hvdy5pbWFnZSAhPT0gbnVsbCk7XG4gIGFycmF5ID0gYXJyYXkuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuc2hvdy5nZW5yZXMubGVuZ3RoICE9PSAwKTtcbiAgY29uc3QgbW92aWVzQXJyYXkgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaCgobW92aWUpID0+IHtcbiAgICBtb3ZpZXNBcnJheS5wdXNoKChtb3ZpZS5zaG93KSk7XG4gIH0pO1xuICByZXR1cm4gbW92aWVzQXJyYXk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRNb3ZpZXM7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKixcXHJcXG4qOjphZnRlcixcXHJcXG4qOjpiZWZvcmUge1xcclxcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gIC0tcHJpbWFyeTogIzI3MmEzMTtcXHJcXG4gIC0tc2Vjb25kYXJ5OiAjZWM1MjQyO1xcclxcbiAgLS10ZXJjaWFyeTogI2QzZDNkMztcXHJcXG4gIC0tYnJhbmQ6ICNkMjMyMjg7XFxyXFxuICAtLXN1Y2Nlc3M6ICMwZDdkNGQ7XFxyXFxuICAtLWluZm86ICMwM2M3ZTg7XFxyXFxuICAtLXdhcm5pbmc6ICNmMGNjMDA7XFxyXFxuICAtLWRhbmdlcjogI2FiMGQwMjtcXHJcXG4gIC0tbGlnaHQ6ICNmMWVjZWE7XFxyXFxuICAtLWRhcms6ICMwMDI2MmI7XFxyXFxuICAtLXdoaXRlOiAjZmZmO1xcclxcbiAgLS1wb3BwaW5zLWZvbnQ6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogdmFyKC0tcG9wcGlucy1mb250KTtcXHJcXG59XFxyXFxuXFxyXFxudWwge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuYSxcXHJcXG5hOjphZnRlcixcXHJcXG5hOnZpc2l0ZWQsXFxyXFxuYTphY3RpdmUsXFxyXFxuYTpob3ZlciB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmQtZmxleCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29sIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbiNoZWFkZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2xvZ28ge1xcclxcbiAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbmF2LWJhciB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBtYXgtd2lkdGg6IDgwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ociB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMge1xcclxcbiAgcGFkZGluZzogMzBweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMtbmFtZSB7XFxyXFxuICBjb2xvcjogdmFyKC0tYnJhbmQpO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVmdCB7XFxyXFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgMjA5LCAyMSwgMCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICBvdmVyZmxvdzogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuI21vZGFsLWNsb3NlLWJ0biB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDFweDtcXHJcXG4gIHJpZ2h0OiAyMHB4O1xcclxcbiAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGFpbmVyIHVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IGRpc2M7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tbGluZTEgPiBkaXYge1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUyIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tdGl0bGUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNtb2RhbC1jb21tZW50cyB7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi8qIFNFQ1RJT04gU0hPV1MgKi9cXHJcXG4ubWFpbi1zaG93cyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbi5zaG93cy1saXN0IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1MHB4O1xcclxcbiAgcGFkZGluZzogMjRweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCBsaSBpbWcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWluZm8ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctbGlrZXMge1xcclxcbiAgcGFkZGluZzogMCAxMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWJ0biB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG4ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XFxyXFxuICBjb2xvcjogdmFyKC0tdGVyY2lhcnkpO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWRhdGUge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC11c2VybmFtZSB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHBhZGRpbmc6IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2sge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubm8tc2Nyb2xsIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHJlc2l6ZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tY29udGFpbmVyIHtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxufVxcclxcblxcclxcbiNjb21tZW50cy1mb3JtIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLW5hbWUge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tY29tbWVudCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLWJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMzAlO1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybS1uYW1lLFxcclxcbiNmb3JtLWNvbW1lbnQsXFxyXFxuI2Zvcm0tYnV0dG9uIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1wb3BwaW5zLWZvbnQpO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTs7O0VBR0UsOEJBQThCO0VBQzlCLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsVUFBVTtBQUNaOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGFBQWE7RUFDYixxQ0FBcUM7QUFDdkM7O0FBRUE7O0VBRUUsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBOzs7OztFQUtFLGNBQWM7RUFDZCx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLDJCQUEyQjtFQUMzQixtQkFBbUI7RUFDbkIsU0FBUztFQUNULGVBQWU7QUFDakI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsU0FBUztBQUNYOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFlBQVk7RUFDWixXQUFXO0VBQ1gsc0NBQXNDO0VBQ3RDLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsMEJBQTBCO0VBQzFCLGtDQUFrQztFQUNsQyxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFdBQVc7RUFDWCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsUUFBUTtBQUNWOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFFBQVE7RUFDUixlQUFlO0FBQ2pCOztBQUVBLGtCQUFrQjtBQUNsQjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQ0FBa0M7RUFDbEMsU0FBUztFQUNULGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFFBQVE7RUFDUixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsUUFBUTtBQUNWOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBOzs7RUFHRSxnQ0FBZ0M7QUFDbENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGlucycpO1xcclxcblxcclxcbiosXFxyXFxuKjo6YWZ0ZXIsXFxyXFxuKjo6YmVmb3JlIHtcXHJcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAtLXByaW1hcnk6ICMyNzJhMzE7XFxyXFxuICAtLXNlY29uZGFyeTogI2VjNTI0MjtcXHJcXG4gIC0tdGVyY2lhcnk6ICNkM2QzZDM7XFxyXFxuICAtLWJyYW5kOiAjZDIzMjI4O1xcclxcbiAgLS1zdWNjZXNzOiAjMGQ3ZDRkO1xcclxcbiAgLS1pbmZvOiAjMDNjN2U4O1xcclxcbiAgLS13YXJuaW5nOiAjZjBjYzAwO1xcclxcbiAgLS1kYW5nZXI6ICNhYjBkMDI7XFxyXFxuICAtLWxpZ2h0OiAjZjFlY2VhO1xcclxcbiAgLS1kYXJrOiAjMDAyNjJiO1xcclxcbiAgLS13aGl0ZTogI2ZmZjtcXHJcXG4gIC0tcG9wcGlucy1mb250OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IHZhcigtLXBvcHBpbnMtZm9udCk7XFxyXFxufVxcclxcblxcclxcbnVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmEsXFxyXFxuYTo6YWZ0ZXIsXFxyXFxuYTp2aXNpdGVkLFxcclxcbmE6YWN0aXZlLFxcclxcbmE6aG92ZXIge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5kLWZsZXgge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbCB7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4jaGVhZGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNsb2dvIHtcXHJcXG4gIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuI25hdi1iYXIge1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWN0aXZlIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgbWF4LXdpZHRoOiA4MCU7XFxyXFxuICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5jcmVkaXRzIHtcXHJcXG4gIHBhZGRpbmc6IDMwcHg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5jcmVkaXRzLW5hbWUge1xcclxcbiAgY29sb3I6IHZhcigtLWJyYW5kKTtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZnQge1xcclxcbiAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDMsIDIwOSwgMjEsIDApO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigycHgpO1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250YWluZXIge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IDcwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxyXFxufVxcclxcblxcclxcbiNtb2RhbC1jbG9zZS1idG4ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAxcHg7XFxyXFxuICByaWdodDogMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB1bCB7XFxyXFxuICBsaXN0LXN0eWxlOiBkaXNjO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMSB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxID4gZGl2IHtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMiB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLXRpdGxlIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jbW9kYWwtY29tbWVudHMge1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbiAgcGFkZGluZzogMjBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTRUNUSU9OIFNIT1dTICovXFxyXFxuLm1haW4tc2hvd3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gIGdhcDogNTBweDtcXHJcXG4gIHBhZGRpbmc6IDI0cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3dzLWxpc3QgbGkgaW1nIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1pbmZvIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi5zaG93LWxpa2VzIHtcXHJcXG4gIHBhZGRpbmc6IDAgMTBweDtcXHJcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1idG4ge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xcclxcbiAgY29sb3I6IHZhcigtLXRlcmNpYXJ5KTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1kYXRlIHtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtdXNlcm5hbWUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBwYWRkaW5nOiAwIDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNsaWNrIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vLXNjcm9sbCB7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG50ZXh0YXJlYSB7XFxyXFxuICByZXNpemU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLWNvbnRhaW5lciB7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4jY29tbWVudHMtZm9ybSB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybS1uYW1lIHtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxuICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLWNvbW1lbnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMHB4O1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybS1idXR0b24ge1xcclxcbiAgd2lkdGg6IDMwJTtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tbmFtZSxcXHJcXG4jZm9ybS1jb21tZW50LFxcclxcbiNmb3JtLWJ1dHRvbiB7XFxyXFxuICBmb250LWZhbWlseTogdmFyKC0tcG9wcGlucy1mb250KTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XHJcbmltcG9ydCBnZXRNb3ZpZXMgZnJvbSAnLi9tb2R1bGVzL3Nob3dzLWFwaS5qcyc7XHJcbmltcG9ydCByZW5kZXJTaG93cyBmcm9tICcuL21vZHVsZXMvcmVuZGVyLWhvbWUuanMnO1xyXG5pbXBvcnQgY29tbWVudHNFdmVudExpc3RlbmVycyBmcm9tICcuL21vZHVsZXMvbW9kYWxzLmpzJztcclxuXHJcbmNvbnN0IHN0YXJ0QXBwID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHNob3dzID0gYXdhaXQgZ2V0TW92aWVzKCk7XHJcbiAgcmVuZGVyU2hvd3Moc2hvd3MpO1xyXG4gIGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMoKTtcclxufTtcclxuXHJcbnN0YXJ0QXBwKCk7Il0sIm5hbWVzIjpbInBvc3RDb21tZW50QXBpIiwiZmV0Y2hDb21tZW50cyIsImlkIiwiYXBpIiwiY29tbWVudHMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwicG9zdENvbW1lbnQiLCJmb3JtIiwibmFtZSIsInZhbHVlIiwiY29tbWVudCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIml0ZW1faWQiLCJ1c2VybmFtZSIsImdldENvbW1lbnRzIiwiYXJyYXkiLCJ1bmRlZmluZWQiLCJzb3J0IiwiYSIsImIiLCJjcmVhdGlvbl9kYXRlIiwicHJpbnRDb21tZW50cyIsImFyciIsImNvbW1lbnRzRGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJhcHBlbmRDaGlsZCIsImZvcm1EaXYiLCJnZXRFbGVtZW50QnlJZCIsIm1vZGFsIiwiaW5zZXJ0QmVmb3JlIiwiY29tbWVudHNDb3VudGVyIiwiZGlzcGxheUNvbW1lbnRzQ291bnRlciIsImNvbW1lbnRzTnVtYmVyIiwidGl0bGUiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJkaXNwbGF5Q29tbWVudHMiLCJkaXNwbGF5Rm9ybSIsInJlRGlzcGxheUNvbW1lbnRzIiwicmVtb3ZlIiwic2V0VGltZW91dCIsImludm9sSWQiLCJiYXNlVXJsIiwibGlrZVVybCIsImZldGNoTGlrZXMiLCJsaWtlcyIsImNhdGNoIiwiZXJyb3IiLCJnZXRMaWtlcyIsInBvc3RMaWtlIiwic2hvd0lkIiwicmVzdWx0Iiwib2siLCJ1cGRhdGVMaWtlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJsaWtlc1RleHQiLCJwYXRoIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZmlyc3RDaGlsZCIsImdldE1vdmllcyIsImNyZWF0ZU1vZGFsSFRNTCIsIm1vdmllIiwic3VtbWFyeSIsInByZW1pZXJlZCIsImdlbnJlcyIsImxhbmd1YWdlIiwiaW1hZ2UiLCJtZWRpdW0iLCJpbWciLCJnZW5yZXNMaXN0IiwiZ2VucmUiLCJsaSIsImZpbHRlck1vdmllIiwibW92aWVzIiwiZmlsdGVyIiwicHJldmVudFNjcm9sbCIsImNsYXNzTGlzdCIsImFkZCIsImFsbG93U2Nyb2xsIiwiY2xvc2VNb2RhbCIsIm5vZGUiLCJwYXJlbnROb2RlIiwibW9kYWxFdmVudExpc3RlbmVycyIsImNsb3NlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY3JlYXRlTW9kYWwiLCJjb21tZW50c0V2ZW50TGlzdGVuZXJzIiwiYnV0dG9ucyIsImJ1dHRvbiIsInJlbmRlclNob3dzIiwic2hvd3MiLCJzaG93c0NvbnRhaW5lciIsInJlc3VsdExpa2VzIiwic2hvdyIsIm51bWJlckxpa2VzIiwiZWxlbWVudCIsImxpc3RJdGVtIiwiZmV0Y2hNb3ZpZXMiLCJtb3ZpZXNBcnJheSIsInB1c2giLCJzdGFydEFwcCJdLCJzb3VyY2VSb290IjoiIn0=