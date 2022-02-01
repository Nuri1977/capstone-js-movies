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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const fetchComments = id => {
  const api = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/fn8dJlnUFl6vA8TtKscd/comments?item_id=${id}`;
  const comments = fetch(api).then(response => response.json()).then(data => data);
  return comments;
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
    <p class="modal-comments-items">No comments...</p>`;
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

const displayComments = async id => {
  const comments = await getComments(id);
  printComments(comments);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayComments);

/***/ }),

/***/ "./src/modules/involvment-api.js":
/*!***************************************!*\
  !*** ./src/modules/involvment-api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const involId = 'fn8dJlnUFl6vA8TtKscd';
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const likeUrl = `${baseUrl}/${involId}/likes/`;

const getLikes = () => fetch(likeUrl).then(result => result.json());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLikes);

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

const modalEventListeners = () => {
  const close = document.querySelector('#modal-close-btn');
  close.addEventListener('click', () => {
    closeModal(close);
  });
};

const createModal = async id => {
  const movie = await filterMovie(id);
  createModalHTML(movie[0]);
  modalEventListeners(id);
  (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__["default"])(id);
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


const renderShows = async shows => {
  const showsContainer = document.getElementById('shows-list');
  showsContainer.innerHTML = '';
  const resultLikes = await (0,_involvment_api_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  shows.forEach(async show => {
    let numberLikes = 0;
    await resultLikes.forEach(element => {
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
  });
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
___CSS_LOADER_EXPORT___.push([module.id, "*,\r\n*::after,\r\n*::before {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n:root {\r\n  --primary: #272a31;\r\n  --secondary: #ec5242;\r\n  --terciary: #d3d3d3;\r\n  --brand: #d23228;\r\n  --success: #0d7d4d;\r\n  --info: #03c7e8;\r\n  --warning: #f0cc00;\r\n  --danger: #ab0d02;\r\n  --light: #f1ecea;\r\n  --dark: #00262b;\r\n  --white: #fff;\r\n  --poppins-font: 'Poppins', sans-serif;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  font-family: var(--poppins-font);\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n}\r\n\r\na,\r\na::after,\r\na:visited,\r\na:active,\r\na:hover {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.col {\r\n  flex-direction: column;\r\n}\r\n\r\n#header {\r\n  width: 100%;\r\n  margin-top: 15px;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  gap: 30px;\r\n  font-size: 30px;\r\n}\r\n\r\n#logo {\r\n  font-size: 40px;\r\n}\r\n\r\n#nav-bar {\r\n  gap: 30px;\r\n}\r\n\r\n.active {\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.container {\r\n  max-width: 80%;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n}\r\n\r\n.credits {\r\n  padding: 30px;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.credits-name {\r\n  color: var(--brand);\r\n}\r\n\r\n.left {\r\n  text-align: left;\r\n}\r\n\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: rgba(43, 209, 21, 0);\r\n  align-items: center;\r\n  justify-self: center;\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  overflow: auto;\r\n}\r\n\r\n.modal-container {\r\n  position: relative;\r\n  width: 70%;\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  align-items: center;\r\n  justify-self: center;\r\n  background-color: white;\r\n  padding: 20px;\r\n  border: solid 1px black;\r\n}\r\n\r\n#modal-close-btn {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 20px;\r\n  font-size: 50px;\r\n}\r\n\r\n.modal-container ul {\r\n  list-style: disc;\r\n}\r\n\r\n.modal-info-line1 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-line1 > div {\r\n  gap: 5px;\r\n}\r\n\r\n.modal-info-line2 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-title {\r\n  font-weight: bold;\r\n}\r\n\r\n#modal-comments {\r\n  align-items: center;\r\n  gap: 5px;\r\n  padding: 20px 0;\r\n}\r\n\r\n/* SECTION SHOWS */\r\n.main-shows {\r\n  background-color: var(--white);\r\n}\r\n\r\n.shows-list {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr;\r\n  gap: 50px;\r\n  padding: 24px 0;\r\n}\r\n\r\n.shows-list li img {\r\n  width: 100%;\r\n  border-radius: 5px;\r\n}\r\n\r\n.show-info {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.show-likes {\r\n  padding: 0 10px;\r\n  text-align: right;\r\n}\r\n\r\n.show-btn {\r\n  text-align: center;\r\n}\r\n\r\n.btn {\r\n  background-color: var(--primary);\r\n  color: var(--terciary);\r\n  padding: 10px;\r\n  border-radius: 2px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.comment-date {\r\n  font-style: italic;\r\n}\r\n\r\n.comment-username {\r\n  font-weight: bold;\r\n  padding: 0 5px;\r\n}\r\n\r\n.click {\r\n  cursor: pointer;\r\n}\r\n\r\n.no-scroll {\r\n  overflow: hidden;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAEA;;;EAGE,8BAA8B;EAC9B,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;EACf,aAAa;EACb,qCAAqC;AACvC;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,cAAc;EACd,wBAAwB;AAC1B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,2BAA2B;EAC3B,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,YAAY;AACd;;AAEA;EACE,WAAW;EACX,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,sCAAsC;EACtC,mBAAmB;EACnB,oBAAoB;EACpB,0BAA0B;EAC1B,kCAAkC;EAClC,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,QAAQ;EACR,eAAe;AACjB;;AAEA,kBAAkB;AAClB;EACE,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gCAAgC;EAChC,sBAAsB;EACtB,aAAa;EACb,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins');\r\n\r\n*,\r\n*::after,\r\n*::before {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n:root {\r\n  --primary: #272a31;\r\n  --secondary: #ec5242;\r\n  --terciary: #d3d3d3;\r\n  --brand: #d23228;\r\n  --success: #0d7d4d;\r\n  --info: #03c7e8;\r\n  --warning: #f0cc00;\r\n  --danger: #ab0d02;\r\n  --light: #f1ecea;\r\n  --dark: #00262b;\r\n  --white: #fff;\r\n  --poppins-font: 'Poppins', sans-serif;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  font-family: var(--poppins-font);\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n}\r\n\r\na,\r\na::after,\r\na:visited,\r\na:active,\r\na:hover {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.col {\r\n  flex-direction: column;\r\n}\r\n\r\n#header {\r\n  width: 100%;\r\n  margin-top: 15px;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  gap: 30px;\r\n  font-size: 30px;\r\n}\r\n\r\n#logo {\r\n  font-size: 40px;\r\n}\r\n\r\n#nav-bar {\r\n  gap: 30px;\r\n}\r\n\r\n.active {\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.container {\r\n  max-width: 80%;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n}\r\n\r\n.credits {\r\n  padding: 30px;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.credits-name {\r\n  color: var(--brand);\r\n}\r\n\r\n.left {\r\n  text-align: left;\r\n}\r\n\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: rgba(43, 209, 21, 0);\r\n  align-items: center;\r\n  justify-self: center;\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  overflow: auto;\r\n}\r\n\r\n.modal-container {\r\n  position: relative;\r\n  width: 70%;\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  align-items: center;\r\n  justify-self: center;\r\n  background-color: white;\r\n  padding: 20px;\r\n  border: solid 1px black;\r\n}\r\n\r\n#modal-close-btn {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 20px;\r\n  font-size: 50px;\r\n}\r\n\r\n.modal-container ul {\r\n  list-style: disc;\r\n}\r\n\r\n.modal-info-line1 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-line1 > div {\r\n  gap: 5px;\r\n}\r\n\r\n.modal-info-line2 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-title {\r\n  font-weight: bold;\r\n}\r\n\r\n#modal-comments {\r\n  align-items: center;\r\n  gap: 5px;\r\n  padding: 20px 0;\r\n}\r\n\r\n/* SECTION SHOWS */\r\n.main-shows {\r\n  background-color: var(--white);\r\n}\r\n\r\n.shows-list {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr;\r\n  gap: 50px;\r\n  padding: 24px 0;\r\n}\r\n\r\n.shows-list li img {\r\n  width: 100%;\r\n  border-radius: 5px;\r\n}\r\n\r\n.show-info {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.show-likes {\r\n  padding: 0 10px;\r\n  text-align: right;\r\n}\r\n\r\n.show-btn {\r\n  text-align: center;\r\n}\r\n\r\n.btn {\r\n  background-color: var(--primary);\r\n  color: var(--terciary);\r\n  padding: 10px;\r\n  border-radius: 2px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.comment-date {\r\n  font-style: italic;\r\n}\r\n\r\n.comment-username {\r\n  font-weight: bold;\r\n  padding: 0 5px;\r\n}\r\n\r\n.click {\r\n  cursor: pointer;\r\n}\r\n\r\n.no-scroll {\r\n  overflow: hidden;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1nRCxRQUFRLEdBQUcsWUFBWTtBQUMzQixRQUFNWixLQUFLLEdBQUcsTUFBTXBDLGlFQUFTLEVBQTdCO0FBQ0FtQyxFQUFBQSxtRUFBVyxDQUFDQyxLQUFELENBQVg7QUFDQUwsRUFBQUEsOERBQXNCO0FBQ3ZCLENBSkQ7O0FBTUFpQixRQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ludm9sdm1lbnQtYXBpLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9tb2RhbHMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL3JlbmRlci1ob21lLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9zaG93cy1hcGkuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmV0Y2hDb21tZW50cyA9IChpZCkgPT4ge1xuICBjb25zdCBhcGkgPSBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvZm44ZEpsblVGbDZ2QThUdEtzY2QvY29tbWVudHM/aXRlbV9pZD0ke2lkfWA7XG4gIGNvbnN0IGNvbW1lbnRzID0gZmV0Y2goYXBpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiBkYXRhKTtcbiAgcmV0dXJuIGNvbW1lbnRzO1xufTtcblxuY29uc3QgZ2V0Q29tbWVudHMgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgYXJyYXkgPSBhd2FpdCBmZXRjaENvbW1lbnRzKGlkKTtcbiAgaWYgKGFycmF5WzBdID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBhcnJheS5zb3J0KChhLCBiKSA9PiBhLmNyZWF0aW9uX2RhdGUgLSBiLmNyZWF0aW9uX2RhdGUpO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG5jb25zdCBwcmludENvbW1lbnRzID0gKGFycikgPT4ge1xuICBjb25zdCBjb21tZW50c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb21tZW50c0Rpdi5jbGFzc05hbWUgPSAnZC1mbGV4IGNvbCc7XG4gIGNvbW1lbnRzRGl2LmlkID0gJ21vZGFsLWNvbW1lbnRzJztcblxuICBpZiAoYXJyID09PSBudWxsKSB7XG4gICAgY29tbWVudHNEaXYuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwibW9kYWwtY29tbWVudHMtdGl0bGVcIj5Db21tZW50cyAoMCk8L3A+XG4gICAgPHAgY2xhc3M9XCJtb2RhbC1jb21tZW50cy1pdGVtc1wiPk5vIGNvbW1lbnRzLi4uPC9wPmA7XG4gIH0gZWxzZSB7XG4gICAgY29tbWVudHNEaXYuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwibW9kYWwtY29tbWVudHMtdGl0bGVcIj5Db21tZW50cyAoJHthcnIubGVuZ3RofSk8L3A+YDtcbiAgICBhcnIuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGl0ZW0uY2xhc3NOYW1lID0gJ21vZGFsLWNvbW1lbnRzLWl0ZW1zJztcbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtjb21tZW50LmNyZWF0aW9uX2RhdGV9PC9zcGFuPiA8c3BhbiBjbGFzcz1cImNvbW1lbnQtdXNlcm5hbWVcIj4ke2NvbW1lbnQudXNlcm5hbWV9Ojwvc3Bhbj4gJHtjb21tZW50LmNvbW1lbnR9YDtcbiAgICAgIGNvbW1lbnRzRGl2LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIH0pO1xuICB9XG4gIGNvbnN0IGZvcm1EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1jb250YWluZXInKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtY29udGFpbmVyJyk7XG4gIG1vZGFsLmluc2VydEJlZm9yZShjb21tZW50c0RpdiwgZm9ybURpdik7XG59O1xuXG5jb25zdCBkaXNwbGF5Q29tbWVudHMgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyhpZCk7XG4gIHByaW50Q29tbWVudHMoY29tbWVudHMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUNvbW1lbnRzOyIsImNvbnN0IGludm9sSWQgPSAnZm44ZEpsblVGbDZ2QThUdEtzY2QnO1xuY29uc3QgYmFzZVVybCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcyc7XG5jb25zdCBsaWtlVXJsID0gYCR7YmFzZVVybH0vJHtpbnZvbElkfS9saWtlcy9gO1xuXG5jb25zdCBnZXRMaWtlcyA9ICgpID0+IGZldGNoKGxpa2VVcmwpXG4gIC50aGVuKChyZXN1bHQpID0+IHJlc3VsdC5qc29uKCkpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRMaWtlczsiLCJpbXBvcnQgZ2V0TW92aWVzIGZyb20gJy4vc2hvd3MtYXBpLmpzJztcbmltcG9ydCBkaXNwbGF5Q29tbWVudHMgZnJvbSAnLi9jb21tZW50cy5qcyc7XG5cbmNvbnN0IGNyZWF0ZU1vZGFsSFRNTCA9IChtb3ZpZSkgPT4ge1xuICBjb25zdCB7XG4gICAgbmFtZSwgc3VtbWFyeSwgcHJlbWllcmVkLFxuICAgIGdlbnJlcywgbGFuZ3VhZ2UsIGltYWdlOiB7IG1lZGl1bSB9LFxuICB9ID0gbW92aWU7XG5cbiAgY29uc3QgaW1nID0gbWVkaXVtO1xuXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsLmNsYXNzTmFtZSA9ICdtb2RhbCBkLWZsZXggY29sJztcblxuICBtb2RhbC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lciBkLWZsZXggY29sXCIgaWQ9XCJtb2RhbC1jb250YWluZXJcIj5cbiAgPGRpdiAgaWQ9J21vZGFsLWNsb3NlLWJ0bicgY2xhc3M9XCJjbGlja1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPjwvZGl2PlxuICA8aW1nIHNyYz1cIiR7aW1nfVwiIGFsdD1cIiR7bmFtZX0gaW1hZ2VcIiBjbGFzcz1cIm1vZGFsLWltZ1wiPlxuICA8aDIgY2xhc3M9XCJtb2RhbC10aXRsZVwiPiR7bmFtZX08L2gyPlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaW5mby1saW5lMSBkLWZsZXhcIj5cbiAgPGRpdiBjbGFzcz1cImQtZmxleFwiPjxwIGNsYXNzPVwibW9kYWwtaW5mby10aXRsZVwiPkxhbmd1YWdlOjwvcD48cCBjbGFzcz1cIm1vZGFsLWluZm9cIj4ke2xhbmd1YWdlfTwvcD48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImQtZmxleFwiPjxwIGNsYXNzPVwibW9kYWwtaW5mby10aXRsZVwiPlByZW1pZXJlZDo8L3A+PHAgY2xhc3M9XCJtb2RhbC1pbmZvXCI+JHtwcmVtaWVyZWR9PC9wPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWluZm8tbGluZTIgZC1mbGV4XCI+XG4gIDxwIGNsYXNzPVwibW9kYWwtaW5mby10aXRsZVwiPkdlbnJlczo8L3A+PHVsIGNsYXNzPVwibW9kYWwtaW5mb1wiIGlkPVwiZ2VucmVzLWxpc3RcIj48L3VsPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLXN1bW1hcnkgZC1mbGV4IGNvbFwiPlxuICA8cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5TdW1tYXJ5OjwvcD5cbiAgJHtzdW1tYXJ5fVxuICA8L2Rpdj5cbiAgPC9kaXY+YDtcblxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKTtcbiAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbiAgY29uc3QgZ2VucmVzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW5yZXMtbGlzdCcpO1xuICBnZW5yZXMuZm9yRWFjaCgoZ2VucmUpID0+IHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGkuaW5uZXJIVE1MID0gYCR7Z2VucmV9YDtcbiAgICBnZW5yZXNMaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgfSk7XG59O1xuXG5jb25zdCBmaWx0ZXJNb3ZpZSA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCBtb3ZpZXMgPSBhd2FpdCBnZXRNb3ZpZXMoKTtcbiAgY29uc3QgbW92aWUgPSBtb3ZpZXMuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuaWQgPT09IGlkKTtcbiAgcmV0dXJuIG1vdmllO1xufTtcblxuY29uc3QgcHJldmVudFNjcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG4gIGJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tc2Nyb2xsJyk7XG59O1xuXG5jb25zdCBhbGxvd1Njcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG4gIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tc2Nyb2xsJyk7XG59O1xuXG5jb25zdCBjbG9zZU1vZGFsID0gKG5vZGUpID0+IHtcbiAgbm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIGFsbG93U2Nyb2xsKCk7XG59O1xuXG5jb25zdCBtb2RhbEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1jbG9zZS1idG4nKTtcbiAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY2xvc2VNb2RhbChjbG9zZSk7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTW9kYWwgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgbW92aWUgPSBhd2FpdCBmaWx0ZXJNb3ZpZShpZCk7XG4gIGNyZWF0ZU1vZGFsSFRNTChtb3ZpZVswXSk7XG4gIG1vZGFsRXZlbnRMaXN0ZW5lcnMoaWQpO1xuICBkaXNwbGF5Q29tbWVudHMoaWQpO1xufTtcblxuY29uc3QgY29tbWVudHNFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tY29tbWVudCcpO1xuICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNyZWF0ZU1vZGFsKCtidXR0b24uaWQpO1xuICAgICAgcHJldmVudFNjcm9sbCgpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnM7IiwiaW1wb3J0IGdldExpa2VzIGZyb20gJy4vaW52b2x2bWVudC1hcGkuanMnO1xuXG5jb25zdCByZW5kZXJTaG93cyA9IGFzeW5jIChzaG93cykgPT4ge1xuICBjb25zdCBzaG93c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93cy1saXN0Jyk7XG4gIHNob3dzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBjb25zdCByZXN1bHRMaWtlcyA9IGF3YWl0IGdldExpa2VzKCk7XG5cbiAgc2hvd3MuZm9yRWFjaChhc3luYyAoc2hvdykgPT4ge1xuICAgIGxldCBudW1iZXJMaWtlcyA9IDA7XG4gICAgYXdhaXQgcmVzdWx0TGlrZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQuaXRlbV9pZCA9PT0gc2hvdy5pZCkge1xuICAgICAgICBudW1iZXJMaWtlcyA9IGVsZW1lbnQubGlrZXM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSBgXG4gICAgPGxpPlxuICAgICAgPGltZyBzcmM9XCIke3Nob3cuaW1hZ2UubWVkaXVtfVwiIGFsdD1cIiR7c2hvdy5uYW1lfSBwaWN0dXJlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2hvdy1pbmZvXCI+XG4gICAgICAgIDxoMz4ke3Nob3cubmFtZX08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdy1saWtlc1wiPlxuICAgICAgICAgIDxpIGlkPVwiJHtzaG93LmlkfVwiIGNsYXNzPVwiZmFyIGZhLWhlYXJ0XCI+PC9pPlxuICAgICAgICAgIDxoND4ke251bWJlckxpa2VzfSBsaWtlczwvaDQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2hvdy1idG5cIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCIke3Nob3cuaWR9XCIgIGNsYXNzPVwiYnRuIGJ0bi1jb21tZW50XCI+Q29tbWVudHM8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gICAgYDtcbiAgICBzaG93c0NvbnRhaW5lci5pbm5lckhUTUwgKz0gbGlzdEl0ZW07XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyU2hvd3M7IiwiY29uc3QgZmV0Y2hNb3ZpZXMgPSAoKSA9PiB7XG4gIGNvbnN0IGFwaSA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3NlYXJjaC9zaG93cz9xPW9jZWFuJztcbiAgY29uc3QgbW92aWUgPSBmZXRjaChhcGkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xuICByZXR1cm4gbW92aWU7XG59O1xuXG5jb25zdCBnZXRNb3ZpZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBhcnJheSA9IGF3YWl0IGZldGNoTW92aWVzKCk7XG4gIGFycmF5ID0gYXJyYXkuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuc2hvdy5pbWFnZSAhPT0gbnVsbCk7XG4gIGFycmF5ID0gYXJyYXkuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuc2hvdy5nZW5yZXMubGVuZ3RoICE9PSAwKTtcbiAgY29uc3QgbW92aWVzQXJyYXkgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaCgobW92aWUpID0+IHtcbiAgICBtb3ZpZXNBcnJheS5wdXNoKChtb3ZpZS5zaG93KSk7XG4gIH0pO1xuICByZXR1cm4gbW92aWVzQXJyYXk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRNb3ZpZXM7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKixcXHJcXG4qOjphZnRlcixcXHJcXG4qOjpiZWZvcmUge1xcclxcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gIC0tcHJpbWFyeTogIzI3MmEzMTtcXHJcXG4gIC0tc2Vjb25kYXJ5OiAjZWM1MjQyO1xcclxcbiAgLS10ZXJjaWFyeTogI2QzZDNkMztcXHJcXG4gIC0tYnJhbmQ6ICNkMjMyMjg7XFxyXFxuICAtLXN1Y2Nlc3M6ICMwZDdkNGQ7XFxyXFxuICAtLWluZm86ICMwM2M3ZTg7XFxyXFxuICAtLXdhcm5pbmc6ICNmMGNjMDA7XFxyXFxuICAtLWRhbmdlcjogI2FiMGQwMjtcXHJcXG4gIC0tbGlnaHQ6ICNmMWVjZWE7XFxyXFxuICAtLWRhcms6ICMwMDI2MmI7XFxyXFxuICAtLXdoaXRlOiAjZmZmO1xcclxcbiAgLS1wb3BwaW5zLWZvbnQ6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogdmFyKC0tcG9wcGlucy1mb250KTtcXHJcXG59XFxyXFxuXFxyXFxudWwge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuYSxcXHJcXG5hOjphZnRlcixcXHJcXG5hOnZpc2l0ZWQsXFxyXFxuYTphY3RpdmUsXFxyXFxuYTpob3ZlciB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmQtZmxleCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29sIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbiNoZWFkZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2xvZ28ge1xcclxcbiAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbmF2LWJhciB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBtYXgtd2lkdGg6IDgwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ociB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMge1xcclxcbiAgcGFkZGluZzogMzBweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMtbmFtZSB7XFxyXFxuICBjb2xvcjogdmFyKC0tYnJhbmQpO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVmdCB7XFxyXFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgMjA5LCAyMSwgMCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICBvdmVyZmxvdzogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuI21vZGFsLWNsb3NlLWJ0biB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDFweDtcXHJcXG4gIHJpZ2h0OiAyMHB4O1xcclxcbiAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGFpbmVyIHVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IGRpc2M7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tbGluZTEgPiBkaXYge1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUyIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tdGl0bGUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNtb2RhbC1jb21tZW50cyB7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi8qIFNFQ1RJT04gU0hPV1MgKi9cXHJcXG4ubWFpbi1zaG93cyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbi5zaG93cy1saXN0IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1MHB4O1xcclxcbiAgcGFkZGluZzogMjRweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCBsaSBpbWcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWluZm8ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctbGlrZXMge1xcclxcbiAgcGFkZGluZzogMCAxMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWJ0biB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG4ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XFxyXFxuICBjb2xvcjogdmFyKC0tdGVyY2lhcnkpO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWRhdGUge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC11c2VybmFtZSB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHBhZGRpbmc6IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2sge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubm8tc2Nyb2xsIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBOzs7RUFHRSw4QkFBOEI7RUFDOUIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsYUFBYTtFQUNiLHFDQUFxQztBQUN2Qzs7QUFFQTs7RUFFRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7Ozs7O0VBS0UsY0FBYztFQUNkLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQiwwQkFBMEI7RUFDMUIsa0NBQWtDO0VBQ2xDLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQix1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsUUFBUTtFQUNSLGVBQWU7QUFDakI7O0FBRUEsa0JBQWtCO0FBQ2xCO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtDQUFrQztFQUNsQyxTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGlucycpO1xcclxcblxcclxcbiosXFxyXFxuKjo6YWZ0ZXIsXFxyXFxuKjo6YmVmb3JlIHtcXHJcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAtLXByaW1hcnk6ICMyNzJhMzE7XFxyXFxuICAtLXNlY29uZGFyeTogI2VjNTI0MjtcXHJcXG4gIC0tdGVyY2lhcnk6ICNkM2QzZDM7XFxyXFxuICAtLWJyYW5kOiAjZDIzMjI4O1xcclxcbiAgLS1zdWNjZXNzOiAjMGQ3ZDRkO1xcclxcbiAgLS1pbmZvOiAjMDNjN2U4O1xcclxcbiAgLS13YXJuaW5nOiAjZjBjYzAwO1xcclxcbiAgLS1kYW5nZXI6ICNhYjBkMDI7XFxyXFxuICAtLWxpZ2h0OiAjZjFlY2VhO1xcclxcbiAgLS1kYXJrOiAjMDAyNjJiO1xcclxcbiAgLS13aGl0ZTogI2ZmZjtcXHJcXG4gIC0tcG9wcGlucy1mb250OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IHZhcigtLXBvcHBpbnMtZm9udCk7XFxyXFxufVxcclxcblxcclxcbnVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmEsXFxyXFxuYTo6YWZ0ZXIsXFxyXFxuYTp2aXNpdGVkLFxcclxcbmE6YWN0aXZlLFxcclxcbmE6aG92ZXIge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5kLWZsZXgge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbCB7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4jaGVhZGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNsb2dvIHtcXHJcXG4gIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuI25hdi1iYXIge1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWN0aXZlIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgbWF4LXdpZHRoOiA4MCU7XFxyXFxuICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5jcmVkaXRzIHtcXHJcXG4gIHBhZGRpbmc6IDMwcHg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5jcmVkaXRzLW5hbWUge1xcclxcbiAgY29sb3I6IHZhcigtLWJyYW5kKTtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZnQge1xcclxcbiAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDMsIDIwOSwgMjEsIDApO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigycHgpO1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250YWluZXIge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IDcwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxyXFxufVxcclxcblxcclxcbiNtb2RhbC1jbG9zZS1idG4ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAxcHg7XFxyXFxuICByaWdodDogMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB1bCB7XFxyXFxuICBsaXN0LXN0eWxlOiBkaXNjO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMSB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxID4gZGl2IHtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMiB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLXRpdGxlIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jbW9kYWwtY29tbWVudHMge1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbiAgcGFkZGluZzogMjBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTRUNUSU9OIFNIT1dTICovXFxyXFxuLm1haW4tc2hvd3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gIGdhcDogNTBweDtcXHJcXG4gIHBhZGRpbmc6IDI0cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3dzLWxpc3QgbGkgaW1nIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1pbmZvIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi5zaG93LWxpa2VzIHtcXHJcXG4gIHBhZGRpbmc6IDAgMTBweDtcXHJcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1idG4ge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xcclxcbiAgY29sb3I6IHZhcigtLXRlcmNpYXJ5KTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1kYXRlIHtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtdXNlcm5hbWUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBwYWRkaW5nOiAwIDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNsaWNrIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vLXNjcm9sbCB7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZXMuY3NzJztcbmltcG9ydCBnZXRNb3ZpZXMgZnJvbSAnLi9tb2R1bGVzL3Nob3dzLWFwaS5qcyc7XG5pbXBvcnQgcmVuZGVyU2hvd3MgZnJvbSAnLi9tb2R1bGVzL3JlbmRlci1ob21lLmpzJztcbmltcG9ydCBjb21tZW50c0V2ZW50TGlzdGVuZXJzIGZyb20gJy4vbW9kdWxlcy9tb2RhbHMuanMnO1xuXG5jb25zdCBzdGFydEFwcCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2hvd3MgPSBhd2FpdCBnZXRNb3ZpZXMoKTtcbiAgcmVuZGVyU2hvd3Moc2hvd3MpO1xuICBjb21tZW50c0V2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG5zdGFydEFwcCgpOyJdLCJuYW1lcyI6WyJmZXRjaENvbW1lbnRzIiwiaWQiLCJhcGkiLCJjb21tZW50cyIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJnZXRDb21tZW50cyIsImFycmF5IiwidW5kZWZpbmVkIiwic29ydCIsImEiLCJiIiwiY3JlYXRpb25fZGF0ZSIsInByaW50Q29tbWVudHMiLCJhcnIiLCJjb21tZW50c0RpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImxlbmd0aCIsImZvckVhY2giLCJjb21tZW50IiwiaXRlbSIsInVzZXJuYW1lIiwiYXBwZW5kQ2hpbGQiLCJmb3JtRGl2IiwiZ2V0RWxlbWVudEJ5SWQiLCJtb2RhbCIsImluc2VydEJlZm9yZSIsImRpc3BsYXlDb21tZW50cyIsImludm9sSWQiLCJiYXNlVXJsIiwibGlrZVVybCIsImdldExpa2VzIiwicmVzdWx0IiwiZ2V0TW92aWVzIiwiY3JlYXRlTW9kYWxIVE1MIiwibW92aWUiLCJuYW1lIiwic3VtbWFyeSIsInByZW1pZXJlZCIsImdlbnJlcyIsImxhbmd1YWdlIiwiaW1hZ2UiLCJtZWRpdW0iLCJpbWciLCJib2R5IiwiZ2VucmVzTGlzdCIsImdlbnJlIiwibGkiLCJmaWx0ZXJNb3ZpZSIsIm1vdmllcyIsImZpbHRlciIsInByZXZlbnRTY3JvbGwiLCJjbGFzc0xpc3QiLCJhZGQiLCJhbGxvd1Njcm9sbCIsInJlbW92ZSIsImNsb3NlTW9kYWwiLCJub2RlIiwicGFyZW50Tm9kZSIsIm1vZGFsRXZlbnRMaXN0ZW5lcnMiLCJjbG9zZSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlTW9kYWwiLCJjb21tZW50c0V2ZW50TGlzdGVuZXJzIiwiYnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidXR0b24iLCJyZW5kZXJTaG93cyIsInNob3dzIiwic2hvd3NDb250YWluZXIiLCJyZXN1bHRMaWtlcyIsInNob3ciLCJudW1iZXJMaWtlcyIsImVsZW1lbnQiLCJpdGVtX2lkIiwibGlrZXMiLCJsaXN0SXRlbSIsImZldGNoTW92aWVzIiwibW92aWVzQXJyYXkiLCJwdXNoIiwic3RhcnRBcHAiXSwic291cmNlUm9vdCI6IiJ9