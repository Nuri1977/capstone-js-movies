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

const commentsCounter = async id => {
  const comments = await getComments(id);

  if (comments === null || comments === undefined) {
    return 0;
  }

  return comments.length;
};

const displayCommentsCounter = async id => {
  const commentsNumber = await commentsCounter(id);
  const title = document.querySelector('.modal-comments-title');
  title.textContent = `Comments (${commentsNumber})`;
};

const displayComments = async id => {
  const comments = await getComments(id);
  printComments(comments);
  displayCommentsCounter(id);
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
    (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.displayCommentsCounter)(id);
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
  const movies = await (0,_shows_api_js__WEBPACK_IMPORTED_MODULE_0__.getMovies)();
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
/* harmony export */   "getMovies": () => (/* binding */ getMovies),
/* harmony export */   "countMovies": () => (/* binding */ countMovies)
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

const countMovies = shows => shows.length;



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
  const shows = await (0,_modules_shows_api_js__WEBPACK_IMPORTED_MODULE_1__.getMovies)();
  (0,_modules_render_home_js__WEBPACK_IMPORTED_MODULE_2__["default"])(shows);
  (0,_modules_modals_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const movieCount = (0,_modules_shows_api_js__WEBPACK_IMPORTED_MODULE_1__.countMovies)(shows);
  document.getElementById('movies-count').innerHTML = `(${movieCount})`;
};

startApp();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0IsY0FBeEIsRUFBd0NOLFNBQXhDLEdBQXFELElBQUdxRixVQUFXLEdBQW5FO0FBQ0QsQ0FORDs7QUFRQUQsUUFBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2NvbW1lbnRzLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mb3JtLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9pbnZvbHZtZW50LWFwaS5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvbW9kYWxzLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9yZW5kZXItaG9tZS5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvc2hvd3MtYXBpLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9zdHlsZXMuY3NzPzQ0YjIiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBvc3RDb21tZW50QXBpID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL2ZuOGRKbG5VRmw2dkE4VHRLc2NkL2NvbW1lbnRzJztcblxuY29uc3QgZmV0Y2hDb21tZW50cyA9IChpZCkgPT4ge1xuICBjb25zdCBhcGkgPSBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvZm44ZEpsblVGbDZ2QThUdEtzY2QvY29tbWVudHM/aXRlbV9pZD0ke2lkfWA7XG4gIGNvbnN0IGNvbW1lbnRzID0gZmV0Y2goYXBpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiBkYXRhKTtcbiAgcmV0dXJuIGNvbW1lbnRzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoaWQsIGZvcm0pID0+IHtcbiAgY29uc3QgbmFtZSA9IGZvcm0ubmFtZS52YWx1ZTtcbiAgY29uc3QgY29tbWVudCA9IGZvcm0uY29tbWVudC52YWx1ZTtcbiAgYXdhaXQgZmV0Y2gocG9zdENvbW1lbnRBcGksIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogaWQsXG4gICAgICB1c2VybmFtZTogbmFtZSxcbiAgICAgIGNvbW1lbnQsXG4gICAgfSksXG4gIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgIH0pO1xufTtcblxuY29uc3QgZ2V0Q29tbWVudHMgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgYXJyYXkgPSBhd2FpdCBmZXRjaENvbW1lbnRzKGlkKTtcbiAgaWYgKGFycmF5WzBdID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBhcnJheS5zb3J0KChhLCBiKSA9PiBhLmNyZWF0aW9uX2RhdGUgLSBiLmNyZWF0aW9uX2RhdGUpO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG5jb25zdCBwcmludENvbW1lbnRzID0gKGFycikgPT4ge1xuICBjb25zdCBjb21tZW50c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb21tZW50c0Rpdi5jbGFzc05hbWUgPSAnZC1mbGV4IGNvbCc7XG4gIGNvbW1lbnRzRGl2LmlkID0gJ21vZGFsLWNvbW1lbnRzJztcblxuICBpZiAoYXJyID09PSBudWxsKSB7XG4gICAgY29tbWVudHNEaXYuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwibW9kYWwtY29tbWVudHMtdGl0bGVcIj5Db21tZW50cyAoMCk8L3A+XG4gICAgPHAgY2xhc3M9XCJtb2RhbC1uby1jb21tZW50c1wiPk5vIGNvbW1lbnRzLi4uPC9wPmA7XG4gIH0gZWxzZSB7XG4gICAgY29tbWVudHNEaXYuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwibW9kYWwtY29tbWVudHMtdGl0bGVcIj5Db21tZW50cyAoJHthcnIubGVuZ3RofSk8L3A+YDtcbiAgICBhcnIuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGl0ZW0uY2xhc3NOYW1lID0gJ21vZGFsLWNvbW1lbnRzLWl0ZW1zJztcbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtjb21tZW50LmNyZWF0aW9uX2RhdGV9PC9zcGFuPiA8c3BhbiBjbGFzcz1cImNvbW1lbnQtdXNlcm5hbWVcIj4ke2NvbW1lbnQudXNlcm5hbWV9Ojwvc3Bhbj4gJHtjb21tZW50LmNvbW1lbnR9YDtcbiAgICAgIGNvbW1lbnRzRGl2LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIH0pO1xuICB9XG4gIGNvbnN0IGZvcm1EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1jb250YWluZXInKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtY29udGFpbmVyJyk7XG4gIG1vZGFsLmluc2VydEJlZm9yZShjb21tZW50c0RpdiwgZm9ybURpdik7XG59O1xuXG5jb25zdCBjb21tZW50c0NvdW50ZXIgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyhpZCk7XG4gIGlmIChjb21tZW50cyA9PT0gbnVsbCB8fCBjb21tZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIGNvbW1lbnRzLmxlbmd0aDtcbn07XG5cbmNvbnN0IGRpc3BsYXlDb21tZW50c0NvdW50ZXIgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgY29tbWVudHNOdW1iZXIgPSBhd2FpdCBjb21tZW50c0NvdW50ZXIoaWQpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb21tZW50cy10aXRsZScpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IGBDb21tZW50cyAoJHtjb21tZW50c051bWJlcn0pYDtcbn07XG5cbmNvbnN0IGRpc3BsYXlDb21tZW50cyA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnRzKGlkKTtcbiAgcHJpbnRDb21tZW50cyhjb21tZW50cyk7XG4gIGRpc3BsYXlDb21tZW50c0NvdW50ZXIoaWQpO1xufTtcblxuZXhwb3J0IHtcbiAgZGlzcGxheUNvbW1lbnRzLCBwb3N0Q29tbWVudCxcbiAgcHJpbnRDb21tZW50cywgZ2V0Q29tbWVudHMsXG4gIGRpc3BsYXlDb21tZW50c0NvdW50ZXIsXG59OyIsImltcG9ydCB7XG4gIHBvc3RDb21tZW50LCBwcmludENvbW1lbnRzLCBnZXRDb21tZW50cywgZGlzcGxheUNvbW1lbnRzQ291bnRlcixcbn0gZnJvbSAnLi9jb21tZW50cy5qcyc7XG5cbmNvbnN0IGRpc3BsYXlGb3JtID0gKCkgPT4ge1xuICBjb25zdCBmb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGZvcm1EaXYuY2xhc3NOYW1lID0gJ2QtZmxleCBjb2wnO1xuICBmb3JtRGl2LmlkID0gJ2Zvcm0tY29udGFpbmVyJztcbiAgZm9ybURpdi5pbm5lckhUTUwgPSBgPHAgaWQ9XCJmb3JtLXRpdGxlXCI+QWRkIGEgY29tbWVudDwvcD5cbiAgPGZvcm0gY2xhc3M9XCJkLWZsZXggY29sXCIgaWQ9XCJjb21tZW50cy1mb3JtXCI+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCIgbmFtZT1cIm5hbWVcIiBpZD1cImZvcm0tbmFtZVwiIG1heGxlbmd0aD1cIjIwXCIgcmVxdWlyZWQ+XG4gIDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHNcIiBuYW1lPVwiY29tbWVudFwiIGlkPVwiZm9ybS1jb21tZW50XCIgbWF4bGVuZ3RoPVwiMTAwXCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJmb3JtLWJ1dHRvblwiPkNvbW1lbnQ8L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xuXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWNvbnRhaW5lcicpO1xuICBtb2RhbC5hcHBlbmRDaGlsZChmb3JtRGl2KTtcbn07XG5cbmNvbnN0IHJlRGlzcGxheUNvbW1lbnRzID0gYXN5bmMgKGlkLCBmb3JtKSA9PiB7XG4gIGF3YWl0IHBvc3RDb21tZW50KGlkLCBmb3JtKTtcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1jb21tZW50cycpKSB7XG4gICAgY29uc3QgY29tbWVudHNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtY29tbWVudHMnKTtcbiAgICBjb21tZW50c0Rpdi5yZW1vdmUoKTtcbiAgfVxuICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnRzKGlkKTtcbiAgICBwcmludENvbW1lbnRzKGNvbW1lbnRzKTtcbiAgICBkaXNwbGF5Q29tbWVudHNDb3VudGVyKGlkKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5Rm9ybSwgcmVEaXNwbGF5Q29tbWVudHMgfTsiLCJjb25zdCBpbnZvbElkID0gJ2ZuOGRKbG5VRmw2dkE4VHRLc2NkJztcbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMnO1xuY29uc3QgbGlrZVVybCA9IGAke2Jhc2VVcmx9LyR7aW52b2xJZH0vbGlrZXMvYDtcblxuLypcbmNvbnN0IGdldExpa2VzID0gKCkgPT4gZmV0Y2gobGlrZVVybClcbiAgLnRoZW4oKHJlc3VsdCkgPT4gcmVzdWx0Lmpzb24oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldExpa2VzO1xuKi9cblxuY29uc3QgZmV0Y2hMaWtlcyA9ICgpID0+IHtcbiAgY29uc3QgYXBpID0gbGlrZVVybDtcbiAgY29uc3QgbGlrZXMgPSBmZXRjaChhcGkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEpXG4gICAgLmNhdGNoKChlcnJvcikgPT4gZXJyb3IpO1xuICByZXR1cm4gbGlrZXM7XG59O1xuXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbGlrZXMgPSBhd2FpdCBmZXRjaExpa2VzKCk7XG4gIGlmIChsaWtlc1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGxpa2VzO1xufTtcblxuY29uc3QgcG9zdExpa2UgPSAoc2hvd0lkKSA9PiBmZXRjaChsaWtlVXJsLCB7XG4gIG1ldGhvZDogJ1BPU1QnLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpdGVtX2lkOiBzaG93SWQgfSksXG59KVxuICAudGhlbigocmVzdWx0KSA9PiByZXN1bHQub2spO1xuXG5jb25zdCB1cGRhdGVMaWtlcyA9ICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpa2UtZGl2JykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHNob3dJZCA9ICtldmVudC50YXJnZXQuaWQ7XG4gICAgICBjb25zdCBsaWtlc1RleHQgPSBldmVudC5wYXRoWzFdLm5leHRFbGVtZW50U2libGluZy5maXJzdENoaWxkO1xuICAgICAgcG9zdExpa2Uoc2hvd0lkKTtcbiAgICAgIGxpa2VzVGV4dC5pbm5lckhUTUwgPSArbGlrZXNUZXh0LnRleHRDb250ZW50ICsgMTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UsIHVwZGF0ZUxpa2VzIH07IiwiaW1wb3J0IHsgZ2V0TW92aWVzIH0gZnJvbSAnLi9zaG93cy1hcGkuanMnO1xuaW1wb3J0IHsgZGlzcGxheUNvbW1lbnRzIH0gZnJvbSAnLi9jb21tZW50cy5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5Rm9ybSwgcmVEaXNwbGF5Q29tbWVudHMgfSBmcm9tICcuL2Zvcm0uanMnO1xuXG5jb25zdCBjcmVhdGVNb2RhbEhUTUwgPSAobW92aWUpID0+IHtcbiAgY29uc3Qge1xuICAgIG5hbWUsIHN1bW1hcnksIHByZW1pZXJlZCxcbiAgICBnZW5yZXMsIGxhbmd1YWdlLCBpbWFnZTogeyBtZWRpdW0gfSxcbiAgfSA9IG1vdmllO1xuXG4gIGNvbnN0IGltZyA9IG1lZGl1bTtcblxuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbC5jbGFzc05hbWUgPSAnbW9kYWwgZC1mbGV4IGNvbCc7XG5cbiAgbW9kYWwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXIgZC1mbGV4IGNvbFwiIGlkPVwibW9kYWwtY29udGFpbmVyXCI+XG4gIDxkaXYgIGlkPSdtb2RhbC1jbG9zZS1idG4nIGNsYXNzPVwiY2xpY2tcIj48aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT48L2Rpdj5cbiAgPGltZyBzcmM9XCIke2ltZ31cIiBhbHQ9XCIke25hbWV9IGltYWdlXCIgY2xhc3M9XCJtb2RhbC1pbWdcIj5cbiAgPGgyIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4ke25hbWV9PC9oMj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWluZm8tbGluZTEgZC1mbGV4XCI+XG4gIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj48cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5MYW5ndWFnZTo8L3A+PHAgY2xhc3M9XCJtb2RhbC1pbmZvXCI+JHtsYW5ndWFnZX08L3A+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj48cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5QcmVtaWVyZWQ6PC9wPjxwIGNsYXNzPVwibW9kYWwtaW5mb1wiPiR7cHJlbWllcmVkfTwvcD48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1pbmZvLWxpbmUyIGQtZmxleFwiPlxuICA8cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5HZW5yZXM6PC9wPjx1bCBjbGFzcz1cIm1vZGFsLWluZm9cIiBpZD1cImdlbnJlcy1saXN0XCI+PC91bD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1zdW1tYXJ5IGQtZmxleCBjb2xcIj5cbiAgPHAgY2xhc3M9XCJtb2RhbC1pbmZvLXRpdGxlXCI+U3VtbWFyeTo8L3A+XG4gICR7c3VtbWFyeX1cbiAgPC9kaXY+XG4gIDwvZGl2PmA7XG5cbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gIGNvbnN0IGdlbnJlc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VucmVzLWxpc3QnKTtcbiAgZ2VucmVzLmZvckVhY2goKGdlbnJlKSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxpLmlubmVySFRNTCA9IGAke2dlbnJlfWA7XG4gICAgZ2VucmVzTGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gIH0pO1xufTtcblxuY29uc3QgZmlsdGVyTW92aWUgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgbW92aWVzID0gYXdhaXQgZ2V0TW92aWVzKCk7XG4gIGNvbnN0IG1vdmllID0gbW92aWVzLmZpbHRlcigobW92aWUpID0+IG1vdmllLmlkID09PSBpZCk7XG4gIHJldHVybiBtb3ZpZTtcbn07XG5cbmNvbnN0IHByZXZlbnRTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xuICBib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXNjcm9sbCcpO1xufTtcblxuY29uc3QgYWxsb3dTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xuICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXNjcm9sbCcpO1xufTtcblxuY29uc3QgY2xvc2VNb2RhbCA9IChub2RlKSA9PiB7XG4gIG5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICBhbGxvd1Njcm9sbCgpO1xufTtcblxuY29uc3QgbW9kYWxFdmVudExpc3RlbmVycyA9IChpZCkgPT4ge1xuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1jbG9zZS1idG4nKTtcbiAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY2xvc2VNb2RhbChjbG9zZSk7XG4gIH0pO1xuXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtZm9ybScpO1xuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGF3YWl0IHJlRGlzcGxheUNvbW1lbnRzKGlkLCBmb3JtKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVNb2RhbCA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCBtb3ZpZSA9IGF3YWl0IGZpbHRlck1vdmllKGlkKTtcbiAgY3JlYXRlTW9kYWxIVE1MKG1vdmllWzBdKTtcbiAgZGlzcGxheUZvcm0oKTtcbiAgZGlzcGxheUNvbW1lbnRzKGlkKTtcbiAgbW9kYWxFdmVudExpc3RlbmVycyhpZCk7XG59O1xuXG5jb25zdCBjb21tZW50c0V2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1jb21tZW50Jyk7XG4gIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3JlYXRlTW9kYWwoK2J1dHRvbi5pZCk7XG4gICAgICBwcmV2ZW50U2Nyb2xsKCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWVudHNFdmVudExpc3RlbmVyczsiLCJpbXBvcnQgeyBnZXRMaWtlcywgdXBkYXRlTGlrZXMgfSBmcm9tICcuL2ludm9sdm1lbnQtYXBpLmpzJztcbmltcG9ydCBjb21tZW50c0V2ZW50TGlzdGVuZXJzIGZyb20gJy4vbW9kYWxzLmpzJztcblxuY29uc3QgcmVuZGVyU2hvd3MgPSBhc3luYyAoc2hvd3MpID0+IHtcbiAgY29uc3Qgc2hvd3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd3MtbGlzdCcpO1xuICBzaG93c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgY29uc3QgcmVzdWx0TGlrZXMgPSBhd2FpdCBnZXRMaWtlcygpO1xuXG4gIHNob3dzLmZvckVhY2goYXN5bmMgKHNob3cpID0+IHtcbiAgICBsZXQgbnVtYmVyTGlrZXMgPSAwO1xuICAgIGlmIChyZXN1bHRMaWtlcyA9PT0gbnVsbCkge1xuICAgICAgbnVtYmVyTGlrZXMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRMaWtlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50Lml0ZW1faWQgPT09IHNob3cuaWQpIHtcbiAgICAgICAgICBudW1iZXJMaWtlcyA9IGVsZW1lbnQubGlrZXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBsaXN0SXRlbSA9IGBcbiAgICA8bGk+XG4gICAgICA8aW1nIHNyYz1cIiR7c2hvdy5pbWFnZS5tZWRpdW19XCIgYWx0PVwiJHtzaG93Lm5hbWV9IHBpY3R1cmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWluZm9cIj5cbiAgICAgICAgPGgzPiR7c2hvdy5uYW1lfTwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWxpa2VzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpa2UtZGl2XCI+XG4gICAgICAgICAgICA8aSBpZD1cIiR7c2hvdy5pZH1cIiBjbGFzcz1cImZhciBmYS1oZWFydFwiPjwvaT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDQ+PHNwYW4gY2xhc3M9XCJsaWtlcy1zcGFuXCI+JHtudW1iZXJMaWtlc308L3NwYW4+IGxpa2VzPC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzaG93LWJ0blwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cIiR7c2hvdy5pZH1cIiAgY2xhc3M9XCJidG4gYnRuLWNvbW1lbnRcIj5Db21tZW50czwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9saT5cbiAgICBgO1xuICAgIHNob3dzQ29udGFpbmVyLmlubmVySFRNTCArPSBsaXN0SXRlbTtcblxuICAgIGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfSk7XG5cbiAgdXBkYXRlTGlrZXMoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlclNob3dzOyIsImNvbnN0IGZldGNoTW92aWVzID0gKCkgPT4ge1xuICBjb25zdCBhcGkgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zZWFyY2gvc2hvd3M/cT1vY2Vhbic7XG4gIGNvbnN0IG1vdmllID0gZmV0Y2goYXBpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiBkYXRhKTtcbiAgcmV0dXJuIG1vdmllO1xufTtcblxuY29uc3QgZ2V0TW92aWVzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgYXJyYXkgPSBhd2FpdCBmZXRjaE1vdmllcygpO1xuICBhcnJheSA9IGFycmF5LmZpbHRlcigobW92aWUpID0+IG1vdmllLnNob3cuaW1hZ2UgIT09IG51bGwpO1xuICBhcnJheSA9IGFycmF5LmZpbHRlcigobW92aWUpID0+IG1vdmllLnNob3cuZ2VucmVzLmxlbmd0aCAhPT0gMCk7XG4gIGNvbnN0IG1vdmllc0FycmF5ID0gW107XG4gIGFycmF5LmZvckVhY2goKG1vdmllKSA9PiB7XG4gICAgbW92aWVzQXJyYXkucHVzaCgobW92aWUuc2hvdykpO1xuICB9KTtcbiAgcmV0dXJuIG1vdmllc0FycmF5O1xufTtcblxuY29uc3QgY291bnRNb3ZpZXMgPSAoc2hvd3MpID0+IHNob3dzLmxlbmd0aDtcbmV4cG9ydCB7IGdldE1vdmllcywgY291bnRNb3ZpZXMgfTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnMpO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqLFxcclxcbio6OmFmdGVyLFxcclxcbio6OmJlZm9yZSB7XFxyXFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgLS1wcmltYXJ5OiAjMjcyYTMxO1xcclxcbiAgLS1zZWNvbmRhcnk6ICNlYzUyNDI7XFxyXFxuICAtLXRlcmNpYXJ5OiAjZDNkM2QzO1xcclxcbiAgLS1icmFuZDogI2QyMzIyODtcXHJcXG4gIC0tc3VjY2VzczogIzBkN2Q0ZDtcXHJcXG4gIC0taW5mbzogIzAzYzdlODtcXHJcXG4gIC0td2FybmluZzogI2YwY2MwMDtcXHJcXG4gIC0tZGFuZ2VyOiAjYWIwZDAyO1xcclxcbiAgLS1saWdodDogI2YxZWNlYTtcXHJcXG4gIC0tZGFyazogIzAwMjYyYjtcXHJcXG4gIC0td2hpdGU6ICNmZmY7XFxyXFxuICAtLXBvcHBpbnMtZm9udDogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLFxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1wb3BwaW5zLWZvbnQpO1xcclxcbn1cXHJcXG5cXHJcXG51bCB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5hLFxcclxcbmE6OmFmdGVyLFxcclxcbmE6dmlzaXRlZCxcXHJcXG5hOmFjdGl2ZSxcXHJcXG5hOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4uZC1mbGV4IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5jb2wge1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuI2hlYWRlciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbiAgZm9udC1zaXplOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbG9nbyB7XFxyXFxuICBmb250LXNpemU6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbiNuYXYtYmFyIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2ZSB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIG1heC13aWR0aDogODAlO1xcclxcbiAgbWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBib3R0b206IDA7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uY3JlZGl0cyB7XFxyXFxuICBwYWRkaW5nOiAzMHB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbn1cXHJcXG5cXHJcXG4uY3JlZGl0cy1uYW1lIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1icmFuZCk7XFxyXFxufVxcclxcblxcclxcbi5sZWZ0IHtcXHJcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQzLCAyMDksIDIxLCAwKTtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXHJcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cigycHgpO1xcclxcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHdpZHRoOiA3MCU7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJvcmRlcjogc29saWQgMXB4IGJsYWNrO1xcclxcbn1cXHJcXG5cXHJcXG4jbW9kYWwtY2xvc2UtYnRuIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMXB4O1xcclxcbiAgcmlnaHQ6IDIwcHg7XFxyXFxuICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250YWluZXIgdWwge1xcclxcbiAgbGlzdC1zdHlsZTogZGlzYztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tbGluZTEge1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMSA+IGRpdiB7XFxyXFxuICBnYXA6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tbGluZTIge1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby10aXRsZSB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI21vZGFsLWNvbW1lbnRzIHtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG4gIHBhZGRpbmc6IDIwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogU0VDVElPTiBTSE9XUyAqL1xcclxcbi5tYWluLXNob3dzIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3dzLWxpc3Qge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICBnYXA6IDUwcHg7XFxyXFxuICBwYWRkaW5nOiAyNHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5zaG93cy1saXN0IGxpIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctaW5mbyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1saWtlcyB7XFxyXFxuICBwYWRkaW5nOiAwIDEwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctYnRuIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0biB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcXHJcXG4gIGNvbG9yOiB2YXIoLS10ZXJjaWFyeSk7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtZGF0ZSB7XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LXVzZXJuYW1lIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgcGFkZGluZzogMCA1cHg7XFxyXFxufVxcclxcblxcclxcbi5jbGljayB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5uby1zY3JvbGwge1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybS1jb250YWluZXIge1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbW1lbnRzLWZvcm0ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBnYXA6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tbmFtZSB7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybS1jb21tZW50IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDBweDtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tYnV0dG9uIHtcXHJcXG4gIHdpZHRoOiAzMCU7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLW5hbWUsXFxyXFxuI2Zvcm0tY29tbWVudCxcXHJcXG4jZm9ybS1idXR0b24ge1xcclxcbiAgZm9udC1mYW1pbHk6IHZhcigtLXBvcHBpbnMtZm9udCk7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBOzs7RUFHRSw4QkFBOEI7RUFDOUIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsYUFBYTtFQUNiLHFDQUFxQztBQUN2Qzs7QUFFQTs7RUFFRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7Ozs7O0VBS0UsY0FBYztFQUNkLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQiwwQkFBMEI7RUFDMUIsa0NBQWtDO0VBQ2xDLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQix1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsUUFBUTtFQUNSLGVBQWU7QUFDakI7O0FBRUEsa0JBQWtCO0FBQ2xCO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtDQUFrQztFQUNsQyxTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsUUFBUTtFQUNSLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7OztFQUdFLGdDQUFnQztBQUNsQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zJyk7XFxyXFxuXFxyXFxuKixcXHJcXG4qOjphZnRlcixcXHJcXG4qOjpiZWZvcmUge1xcclxcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gIC0tcHJpbWFyeTogIzI3MmEzMTtcXHJcXG4gIC0tc2Vjb25kYXJ5OiAjZWM1MjQyO1xcclxcbiAgLS10ZXJjaWFyeTogI2QzZDNkMztcXHJcXG4gIC0tYnJhbmQ6ICNkMjMyMjg7XFxyXFxuICAtLXN1Y2Nlc3M6ICMwZDdkNGQ7XFxyXFxuICAtLWluZm86ICMwM2M3ZTg7XFxyXFxuICAtLXdhcm5pbmc6ICNmMGNjMDA7XFxyXFxuICAtLWRhbmdlcjogI2FiMGQwMjtcXHJcXG4gIC0tbGlnaHQ6ICNmMWVjZWE7XFxyXFxuICAtLWRhcms6ICMwMDI2MmI7XFxyXFxuICAtLXdoaXRlOiAjZmZmO1xcclxcbiAgLS1wb3BwaW5zLWZvbnQ6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogdmFyKC0tcG9wcGlucy1mb250KTtcXHJcXG59XFxyXFxuXFxyXFxudWwge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuYSxcXHJcXG5hOjphZnRlcixcXHJcXG5hOnZpc2l0ZWQsXFxyXFxuYTphY3RpdmUsXFxyXFxuYTpob3ZlciB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmQtZmxleCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29sIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbiNoZWFkZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2xvZ28ge1xcclxcbiAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbmF2LWJhciB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBtYXgtd2lkdGg6IDgwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ociB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMge1xcclxcbiAgcGFkZGluZzogMzBweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMtbmFtZSB7XFxyXFxuICBjb2xvcjogdmFyKC0tYnJhbmQpO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVmdCB7XFxyXFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgMjA5LCAyMSwgMCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICBvdmVyZmxvdzogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuI21vZGFsLWNsb3NlLWJ0biB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDFweDtcXHJcXG4gIHJpZ2h0OiAyMHB4O1xcclxcbiAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGFpbmVyIHVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IGRpc2M7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tbGluZTEgPiBkaXYge1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUyIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tdGl0bGUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNtb2RhbC1jb21tZW50cyB7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi8qIFNFQ1RJT04gU0hPV1MgKi9cXHJcXG4ubWFpbi1zaG93cyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbi5zaG93cy1saXN0IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1MHB4O1xcclxcbiAgcGFkZGluZzogMjRweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCBsaSBpbWcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWluZm8ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctbGlrZXMge1xcclxcbiAgcGFkZGluZzogMCAxMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWJ0biB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG4ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XFxyXFxuICBjb2xvcjogdmFyKC0tdGVyY2lhcnkpO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWRhdGUge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC11c2VybmFtZSB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHBhZGRpbmc6IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2sge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubm8tc2Nyb2xsIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHJlc2l6ZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tY29udGFpbmVyIHtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxufVxcclxcblxcclxcbiNjb21tZW50cy1mb3JtIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLW5hbWUge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2Zvcm0tY29tbWVudCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNmb3JtLWJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMzAlO1xcclxcbn1cXHJcXG5cXHJcXG4jZm9ybS1uYW1lLFxcclxcbiNmb3JtLWNvbW1lbnQsXFxyXFxuI2Zvcm0tYnV0dG9uIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1wb3BwaW5zLWZvbnQpO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IGdldE1vdmllcywgY291bnRNb3ZpZXMgfSBmcm9tICcuL21vZHVsZXMvc2hvd3MtYXBpLmpzJztcbmltcG9ydCByZW5kZXJTaG93cyBmcm9tICcuL21vZHVsZXMvcmVuZGVyLWhvbWUuanMnO1xuaW1wb3J0IGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMgZnJvbSAnLi9tb2R1bGVzL21vZGFscy5qcyc7XG5cbmNvbnN0IHN0YXJ0QXBwID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzaG93cyA9IGF3YWl0IGdldE1vdmllcygpO1xuICByZW5kZXJTaG93cyhzaG93cyk7XG4gIGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMoKTtcbiAgY29uc3QgbW92aWVDb3VudCA9IGNvdW50TW92aWVzKHNob3dzKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmllcy1jb3VudCcpLmlubmVySFRNTCA9IGAoJHttb3ZpZUNvdW50fSlgO1xufTtcblxuc3RhcnRBcHAoKTsiXSwibmFtZXMiOlsicG9zdENvbW1lbnRBcGkiLCJmZXRjaENvbW1lbnRzIiwiaWQiLCJhcGkiLCJjb21tZW50cyIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJwb3N0Q29tbWVudCIsImZvcm0iLCJuYW1lIiwidmFsdWUiLCJjb21tZW50IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsInVzZXJuYW1lIiwiZ2V0Q29tbWVudHMiLCJhcnJheSIsInVuZGVmaW5lZCIsInNvcnQiLCJhIiwiYiIsImNyZWF0aW9uX2RhdGUiLCJwcmludENvbW1lbnRzIiwiYXJyIiwiY29tbWVudHNEaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsImFwcGVuZENoaWxkIiwiZm9ybURpdiIsImdldEVsZW1lbnRCeUlkIiwibW9kYWwiLCJpbnNlcnRCZWZvcmUiLCJjb21tZW50c0NvdW50ZXIiLCJkaXNwbGF5Q29tbWVudHNDb3VudGVyIiwiY29tbWVudHNOdW1iZXIiLCJ0aXRsZSIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImRpc3BsYXlDb21tZW50cyIsImRpc3BsYXlGb3JtIiwicmVEaXNwbGF5Q29tbWVudHMiLCJyZW1vdmUiLCJzZXRUaW1lb3V0IiwiaW52b2xJZCIsImJhc2VVcmwiLCJsaWtlVXJsIiwiZmV0Y2hMaWtlcyIsImxpa2VzIiwiY2F0Y2giLCJlcnJvciIsImdldExpa2VzIiwicG9zdExpa2UiLCJzaG93SWQiLCJyZXN1bHQiLCJvayIsInVwZGF0ZUxpa2VzIiwicXVlcnlTZWxlY3RvckFsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsImxpa2VzVGV4dCIsInBhdGgiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJmaXJzdENoaWxkIiwiZ2V0TW92aWVzIiwiY3JlYXRlTW9kYWxIVE1MIiwibW92aWUiLCJzdW1tYXJ5IiwicHJlbWllcmVkIiwiZ2VucmVzIiwibGFuZ3VhZ2UiLCJpbWFnZSIsIm1lZGl1bSIsImltZyIsImdlbnJlc0xpc3QiLCJnZW5yZSIsImxpIiwiZmlsdGVyTW92aWUiLCJtb3ZpZXMiLCJmaWx0ZXIiLCJwcmV2ZW50U2Nyb2xsIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWxsb3dTY3JvbGwiLCJjbG9zZU1vZGFsIiwibm9kZSIsInBhcmVudE5vZGUiLCJtb2RhbEV2ZW50TGlzdGVuZXJzIiwiY2xvc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVNb2RhbCIsImNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMiLCJidXR0b25zIiwiYnV0dG9uIiwicmVuZGVyU2hvd3MiLCJzaG93cyIsInNob3dzQ29udGFpbmVyIiwicmVzdWx0TGlrZXMiLCJzaG93IiwibnVtYmVyTGlrZXMiLCJlbGVtZW50IiwibGlzdEl0ZW0iLCJmZXRjaE1vdmllcyIsIm1vdmllc0FycmF5IiwicHVzaCIsImNvdW50TW92aWVzIiwic3RhcnRBcHAiLCJtb3ZpZUNvdW50Il0sInNvdXJjZVJvb3QiOiIifQ==