/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  ${summary}
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
};

const commentsEventListeners = () => {
  const buttons = document.querySelectorAll('.btn-comment');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log(`click ${button.id}`);
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
const renderShows = shows => {
  const showsContainer = document.getElementById('shows-list');
  showsContainer.innerHTML = '';
  shows.forEach(show => {
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
___CSS_LOADER_EXPORT___.push([module.id, "*,\r\n*::after,\r\n*::before {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n:root {\r\n  --primary: #272a31;\r\n  --secondary: #ec5242;\r\n  --terciary: #d3d3d3;\r\n  --brand: #d23228;\r\n  --success: #0d7d4d;\r\n  --info: #03c7e8;\r\n  --warning: #f0cc00;\r\n  --danger: #ab0d02;\r\n  --light: #f1ecea;\r\n  --dark: #00262b;\r\n  --white: #fff;\r\n  --poppins-font: 'Poppins', sans-serif;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  font-family: var(--poppins-font);\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n}\r\n\r\na,\r\na::after,\r\na:visited,\r\na:active,\r\na:hover {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.col {\r\n  flex-direction: column;\r\n}\r\n\r\n#header {\r\n  width: 100%;\r\n  margin-top: 15px;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  gap: 30px;\r\n  font-size: 30px;\r\n}\r\n\r\n#logo {\r\n  font-size: 40px;\r\n}\r\n\r\n#nav-bar {\r\n  gap: 30px;\r\n}\r\n\r\n.active {\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.container {\r\n  max-width: 80%;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n}\r\n\r\n.credits {\r\n  padding: 30px;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.credits-name {\r\n  color: var(--brand);\r\n}\r\n\r\n.left {\r\n  text-align: left;\r\n}\r\n\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: rgba(43, 209, 21, 0);\r\n  align-items: center;\r\n  justify-self: center;\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  overflow: auto;\r\n}\r\n\r\n.modal-container {\r\n  position: relative;\r\n  width: 70%;\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  align-items: center;\r\n  justify-self: center;\r\n  background-color: white;\r\n  padding: 20px;\r\n  border: solid 1px black;\r\n}\r\n\r\n#modal-close-btn {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 20px;\r\n  font-size: 50px;\r\n}\r\n\r\n.modal-container ul {\r\n  list-style: disc;\r\n}\r\n\r\n.modal-info-line1 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-line1 > div {\r\n  gap: 5px;\r\n}\r\n\r\n.modal-info-line2 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-title {\r\n  font-weight: bold;\r\n}\r\n\r\n/* SECTION SHOWS */\r\n.main-shows {\r\n  background-color: var(--white);\r\n}\r\n\r\n.shows-list {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr;\r\n  gap: 50px;\r\n  padding: 24px 0;\r\n}\r\n\r\n.shows-list li img {\r\n  width: 100%;\r\n  border-radius: 5px;\r\n}\r\n\r\n.show-info {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.show-likes {\r\n  padding: 0 10px;\r\n  text-align: right;\r\n}\r\n\r\n.show-btn {\r\n  text-align: center;\r\n}\r\n\r\n.btn {\r\n  background-color: var(--primary);\r\n  color: var(--terciary);\r\n  padding: 10px;\r\n  border-radius: 2px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.click {\r\n  cursor: pointer;\r\n}\r\n\r\n.no-scroll {\r\n  overflow: hidden;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAEA;;;EAGE,8BAA8B;EAC9B,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;EACf,aAAa;EACb,qCAAqC;AACvC;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,cAAc;EACd,wBAAwB;AAC1B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,2BAA2B;EAC3B,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,YAAY;AACd;;AAEA;EACE,WAAW;EACX,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,sCAAsC;EACtC,mBAAmB;EACnB,oBAAoB;EACpB,0BAA0B;EAC1B,kCAAkC;EAClC,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA,kBAAkB;AAClB;EACE,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gCAAgC;EAChC,sBAAsB;EACtB,aAAa;EACb,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins');\r\n\r\n*,\r\n*::after,\r\n*::before {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n:root {\r\n  --primary: #272a31;\r\n  --secondary: #ec5242;\r\n  --terciary: #d3d3d3;\r\n  --brand: #d23228;\r\n  --success: #0d7d4d;\r\n  --info: #03c7e8;\r\n  --warning: #f0cc00;\r\n  --danger: #ab0d02;\r\n  --light: #f1ecea;\r\n  --dark: #00262b;\r\n  --white: #fff;\r\n  --poppins-font: 'Poppins', sans-serif;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  font-family: var(--poppins-font);\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n}\r\n\r\na,\r\na::after,\r\na:visited,\r\na:active,\r\na:hover {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.col {\r\n  flex-direction: column;\r\n}\r\n\r\n#header {\r\n  width: 100%;\r\n  margin-top: 15px;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  gap: 30px;\r\n  font-size: 30px;\r\n}\r\n\r\n#logo {\r\n  font-size: 40px;\r\n}\r\n\r\n#nav-bar {\r\n  gap: 30px;\r\n}\r\n\r\n.active {\r\n  font-weight: bold;\r\n  text-decoration: underline;\r\n}\r\n\r\n.container {\r\n  max-width: 80%;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n}\r\n\r\n.credits {\r\n  padding: 30px;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.credits-name {\r\n  color: var(--brand);\r\n}\r\n\r\n.left {\r\n  text-align: left;\r\n}\r\n\r\n.modal {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: rgba(43, 209, 21, 0);\r\n  align-items: center;\r\n  justify-self: center;\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  overflow: auto;\r\n}\r\n\r\n.modal-container {\r\n  position: relative;\r\n  width: 70%;\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  align-items: center;\r\n  justify-self: center;\r\n  background-color: white;\r\n  padding: 20px;\r\n  border: solid 1px black;\r\n}\r\n\r\n#modal-close-btn {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 20px;\r\n  font-size: 50px;\r\n}\r\n\r\n.modal-container ul {\r\n  list-style: disc;\r\n}\r\n\r\n.modal-info-line1 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-line1 > div {\r\n  gap: 5px;\r\n}\r\n\r\n.modal-info-line2 {\r\n  gap: 30px;\r\n}\r\n\r\n.modal-info-title {\r\n  font-weight: bold;\r\n}\r\n\r\n/* SECTION SHOWS */\r\n.main-shows {\r\n  background-color: var(--white);\r\n}\r\n\r\n.shows-list {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr;\r\n  gap: 50px;\r\n  padding: 24px 0;\r\n}\r\n\r\n.shows-list li img {\r\n  width: 100%;\r\n  border-radius: 5px;\r\n}\r\n\r\n.show-info {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.show-likes {\r\n  padding: 0 10px;\r\n  text-align: right;\r\n}\r\n\r\n.show-btn {\r\n  text-align: center;\r\n}\r\n\r\n.btn {\r\n  background-color: var(--primary);\r\n  color: var(--terciary);\r\n  padding: 10px;\r\n  border-radius: 2px;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n}\r\n\r\n.click {\r\n  cursor: pointer;\r\n}\r\n\r\n.no-scroll {\r\n  overflow: hidden;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTThELFFBQVEsR0FBRyxZQUFZO0FBQzNCLFFBQU1mLEtBQUssR0FBRyxNQUFNL0MsaUVBQVMsRUFBN0I7QUFDQThDLEVBQUFBLG1FQUFXLENBQUNDLEtBQUQsQ0FBWDtBQUNBUCxFQUFBQSw4REFBc0I7QUFDdkIsQ0FKRDs7QUFNQXNCLFFBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9tb2RhbHMuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL3JlbmRlci1ob21lLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9zaG93cy1hcGkuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9taWNyb3ZlcnNlLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWljcm92ZXJzZS10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21pY3JvdmVyc2UtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldE1vdmllcyBmcm9tICcuL3Nob3dzLWFwaS5qcyc7XG5cbmNvbnN0IGNyZWF0ZU1vZGFsSFRNTCA9IChtb3ZpZSkgPT4ge1xuICBjb25zdCB7XG4gICAgbmFtZSwgc3VtbWFyeSwgcHJlbWllcmVkLFxuICAgIGdlbnJlcywgbGFuZ3VhZ2UsIGltYWdlOiB7IG1lZGl1bSB9LFxuICB9ID0gbW92aWU7XG5cbiAgY29uc3QgaW1nID0gbWVkaXVtO1xuXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsLmNsYXNzTmFtZSA9ICdtb2RhbCBkLWZsZXggY29sJztcblxuICBtb2RhbC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lciBkLWZsZXggY29sXCIgaWQ9XCJtb2RhbC1jb250YWluZXJcIj5cbiAgPGRpdiAgaWQ9J21vZGFsLWNsb3NlLWJ0bicgY2xhc3M9XCJjbGlja1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPjwvZGl2PlxuICA8aW1nIHNyYz1cIiR7aW1nfVwiIGFsdD1cIiR7bmFtZX0gaW1hZ2VcIiBjbGFzcz1cIm1vZGFsLWltZ1wiPlxuICA8aDIgY2xhc3M9XCJtb2RhbC10aXRsZVwiPiR7bmFtZX08L2gyPlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaW5mby1saW5lMSBkLWZsZXhcIj5cbiAgPGRpdiBjbGFzcz1cImQtZmxleFwiPjxwIGNsYXNzPVwibW9kYWwtaW5mby10aXRsZVwiPkxhbmd1YWdlOjwvcD48cCBjbGFzcz1cIm1vZGFsLWluZm9cIj4ke2xhbmd1YWdlfTwvcD48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImQtZmxleFwiPjxwIGNsYXNzPVwibW9kYWwtaW5mby10aXRsZVwiPlByZW1pZXJlZDo8L3A+PHAgY2xhc3M9XCJtb2RhbC1pbmZvXCI+JHtwcmVtaWVyZWR9PC9wPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWluZm8tbGluZTIgZC1mbGV4XCI+XG4gIDxwIGNsYXNzPVwibW9kYWwtaW5mby10aXRsZVwiPkdlbnJlczo8L3A+PHVsIGNsYXNzPVwibW9kYWwtaW5mb1wiIGlkPVwiZ2VucmVzLWxpc3RcIj48L3VsPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLXN1bW1hcnkgZC1mbGV4IGNvbFwiPlxuICA8cCBjbGFzcz1cIm1vZGFsLWluZm8tdGl0bGVcIj5TdW1tYXJ5OjwvcD5cbiAgJHtzdW1tYXJ5fVxuICAke3N1bW1hcnl9XG4gICR7c3VtbWFyeX1cbiAgPC9kaXY+XG4gIDwvZGl2PmA7XG5cbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gIGNvbnN0IGdlbnJlc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VucmVzLWxpc3QnKTtcbiAgZ2VucmVzLmZvckVhY2goKGdlbnJlKSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxpLmlubmVySFRNTCA9IGAke2dlbnJlfWA7XG4gICAgZ2VucmVzTGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gIH0pO1xufTtcblxuY29uc3QgZmlsdGVyTW92aWUgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgbW92aWVzID0gYXdhaXQgZ2V0TW92aWVzKCk7XG4gIGNvbnN0IG1vdmllID0gbW92aWVzLmZpbHRlcigobW92aWUpID0+IG1vdmllLmlkID09PSBpZCk7XG4gIHJldHVybiBtb3ZpZTtcbn07XG5cbmNvbnN0IHByZXZlbnRTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xuICBib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXNjcm9sbCcpO1xufTtcblxuY29uc3QgYWxsb3dTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xuICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXNjcm9sbCcpO1xufTtcblxuY29uc3QgY2xvc2VNb2RhbCA9IChub2RlKSA9PiB7XG4gIG5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICBhbGxvd1Njcm9sbCgpO1xufTtcblxuY29uc3QgbW9kYWxFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtY2xvc2UtYnRuJyk7XG4gIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNsb3NlTW9kYWwoY2xvc2UpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZU1vZGFsID0gYXN5bmMgKGlkKSA9PiB7XG4gIGNvbnN0IG1vdmllID0gYXdhaXQgZmlsdGVyTW92aWUoaWQpO1xuICBjcmVhdGVNb2RhbEhUTUwobW92aWVbMF0pO1xuICBtb2RhbEV2ZW50TGlzdGVuZXJzKGlkKTtcbn07XG5cblxuY29uc3QgY29tbWVudHNFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tY29tbWVudCcpO1xuICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBjbGljayAke2J1dHRvbi5pZH1gKTtcbiAgICAgIGNyZWF0ZU1vZGFsKCtidXR0b24uaWQpO1xuICAgICAgcHJldmVudFNjcm9sbCgpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnM7IiwiY29uc3QgcmVuZGVyU2hvd3MgPSAoc2hvd3MpID0+IHtcbiAgY29uc3Qgc2hvd3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd3MtbGlzdCcpO1xuICBzaG93c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgc2hvd3MuZm9yRWFjaCgoc2hvdykgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gYFxuICAgIDxsaT5cbiAgICAgIDxpbWcgc3JjPVwiJHtzaG93LmltYWdlLm1lZGl1bX1cIiBhbHQ9XCIke3Nob3cubmFtZX0gcGljdHVyZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNob3ctaW5mb1wiPlxuICAgICAgICA8aDM+JHtzaG93Lm5hbWV9PC9oMz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3ctbGlrZXNcIj5cbiAgICAgICAgICA8aSBpZD1cIiR7c2hvdy5pZH1cIiBjbGFzcz1cImZhciBmYS1oZWFydFwiPjwvaT5cbiAgICAgICAgICA8aDQ+MCBsaWtlczwvaDQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2hvdy1idG5cIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCIke3Nob3cuaWR9XCIgIGNsYXNzPVwiYnRuIGJ0bi1jb21tZW50XCI+Q29tbWVudHM8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gICAgYDtcbiAgICBzaG93c0NvbnRhaW5lci5pbm5lckhUTUwgKz0gbGlzdEl0ZW07XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyU2hvd3M7IiwiY29uc3QgZmV0Y2hNb3ZpZXMgPSAoKSA9PiB7XG4gIGNvbnN0IGFwaSA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3NlYXJjaC9zaG93cz9xPW9jZWFuJztcbiAgY29uc3QgbW92aWUgPSBmZXRjaChhcGkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xuICByZXR1cm4gbW92aWU7XG59O1xuXG5jb25zdCBnZXRNb3ZpZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBhcnJheSA9IGF3YWl0IGZldGNoTW92aWVzKCk7XG4gIGFycmF5ID0gYXJyYXkuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuc2hvdy5pbWFnZSAhPT0gbnVsbCk7XG4gIGFycmF5ID0gYXJyYXkuZmlsdGVyKChtb3ZpZSkgPT4gbW92aWUuc2hvdy5nZW5yZXMubGVuZ3RoICE9PSAwKTtcbiAgY29uc3QgbW92aWVzQXJyYXkgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaCgobW92aWUpID0+IHtcbiAgICBtb3ZpZXNBcnJheS5wdXNoKChtb3ZpZS5zaG93KSk7XG4gIH0pO1xuICByZXR1cm4gbW92aWVzQXJyYXk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRNb3ZpZXM7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKixcXHJcXG4qOjphZnRlcixcXHJcXG4qOjpiZWZvcmUge1xcclxcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gIC0tcHJpbWFyeTogIzI3MmEzMTtcXHJcXG4gIC0tc2Vjb25kYXJ5OiAjZWM1MjQyO1xcclxcbiAgLS10ZXJjaWFyeTogI2QzZDNkMztcXHJcXG4gIC0tYnJhbmQ6ICNkMjMyMjg7XFxyXFxuICAtLXN1Y2Nlc3M6ICMwZDdkNGQ7XFxyXFxuICAtLWluZm86ICMwM2M3ZTg7XFxyXFxuICAtLXdhcm5pbmc6ICNmMGNjMDA7XFxyXFxuICAtLWRhbmdlcjogI2FiMGQwMjtcXHJcXG4gIC0tbGlnaHQ6ICNmMWVjZWE7XFxyXFxuICAtLWRhcms6ICMwMDI2MmI7XFxyXFxuICAtLXdoaXRlOiAjZmZmO1xcclxcbiAgLS1wb3BwaW5zLWZvbnQ6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogdmFyKC0tcG9wcGlucy1mb250KTtcXHJcXG59XFxyXFxuXFxyXFxudWwge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuYSxcXHJcXG5hOjphZnRlcixcXHJcXG5hOnZpc2l0ZWQsXFxyXFxuYTphY3RpdmUsXFxyXFxuYTpob3ZlciB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmQtZmxleCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29sIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbiNoZWFkZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2xvZ28ge1xcclxcbiAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbmF2LWJhciB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBtYXgtd2lkdGg6IDgwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ociB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMge1xcclxcbiAgcGFkZGluZzogMzBweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWRpdHMtbmFtZSB7XFxyXFxuICBjb2xvcjogdmFyKC0tYnJhbmQpO1xcclxcbn1cXHJcXG5cXHJcXG4ubGVmdCB7XFxyXFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgMjA5LCAyMSwgMCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICBvdmVyZmxvdzogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuI21vZGFsLWNsb3NlLWJ0biB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDFweDtcXHJcXG4gIHJpZ2h0OiAyMHB4O1xcclxcbiAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGFpbmVyIHVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IGRpc2M7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tbGluZTEgPiBkaXYge1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUyIHtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWluZm8tdGl0bGUge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi8qIFNFQ1RJT04gU0hPV1MgKi9cXHJcXG4ubWFpbi1zaG93cyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbi5zaG93cy1saXN0IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1MHB4O1xcclxcbiAgcGFkZGluZzogMjRweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCBsaSBpbWcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWluZm8ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3ctbGlrZXMge1xcclxcbiAgcGFkZGluZzogMCAxMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxufVxcclxcblxcclxcbi5zaG93LWJ0biB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG4ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XFxyXFxuICBjb2xvcjogdmFyKC0tdGVyY2lhcnkpO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jbGljayB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5uby1zY3JvbGwge1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7OztFQUdFLDhCQUE4QjtFQUM5QixzQkFBc0I7RUFDdEIsU0FBUztFQUNULFVBQVU7QUFDWjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixhQUFhO0VBQ2IscUNBQXFDO0FBQ3ZDOztBQUVBOztFQUVFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTs7Ozs7RUFLRSxjQUFjO0VBQ2Qsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQiwyQkFBMkI7RUFDM0IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBQ1osV0FBVztFQUNYLHNDQUFzQztFQUN0QyxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLDBCQUEwQjtFQUMxQixrQ0FBa0M7RUFDbEMsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixXQUFXO0VBQ1gsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFFBQVE7QUFDVjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQSxrQkFBa0I7QUFDbEI7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0NBQWtDO0VBQ2xDLFNBQVM7RUFDVCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGlucycpO1xcclxcblxcclxcbiosXFxyXFxuKjo6YWZ0ZXIsXFxyXFxuKjo6YmVmb3JlIHtcXHJcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAtLXByaW1hcnk6ICMyNzJhMzE7XFxyXFxuICAtLXNlY29uZGFyeTogI2VjNTI0MjtcXHJcXG4gIC0tdGVyY2lhcnk6ICNkM2QzZDM7XFxyXFxuICAtLWJyYW5kOiAjZDIzMjI4O1xcclxcbiAgLS1zdWNjZXNzOiAjMGQ3ZDRkO1xcclxcbiAgLS1pbmZvOiAjMDNjN2U4O1xcclxcbiAgLS13YXJuaW5nOiAjZjBjYzAwO1xcclxcbiAgLS1kYW5nZXI6ICNhYjBkMDI7XFxyXFxuICAtLWxpZ2h0OiAjZjFlY2VhO1xcclxcbiAgLS1kYXJrOiAjMDAyNjJiO1xcclxcbiAgLS13aGl0ZTogI2ZmZjtcXHJcXG4gIC0tcG9wcGlucy1mb250OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IHZhcigtLXBvcHBpbnMtZm9udCk7XFxyXFxufVxcclxcblxcclxcbnVsIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmEsXFxyXFxuYTo6YWZ0ZXIsXFxyXFxuYTp2aXNpdGVkLFxcclxcbmE6YWN0aXZlLFxcclxcbmE6aG92ZXIge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5kLWZsZXgge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbCB7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4jaGVhZGVyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNsb2dvIHtcXHJcXG4gIGZvbnQtc2l6ZTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuI25hdi1iYXIge1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWN0aXZlIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgbWF4LXdpZHRoOiA4MCU7XFxyXFxuICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5jcmVkaXRzIHtcXHJcXG4gIHBhZGRpbmc6IDMwcHg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5jcmVkaXRzLW5hbWUge1xcclxcbiAgY29sb3I6IHZhcigtLWJyYW5kKTtcXHJcXG59XFxyXFxuXFxyXFxuLmxlZnQge1xcclxcbiAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDMsIDIwOSwgMjEsIDApO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigycHgpO1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250YWluZXIge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IDcwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxyXFxufVxcclxcblxcclxcbiNtb2RhbC1jbG9zZS1idG4ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAxcHg7XFxyXFxuICByaWdodDogMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lciB1bCB7XFxyXFxuICBsaXN0LXN0eWxlOiBkaXNjO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMSB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLWxpbmUxID4gZGl2IHtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtaW5mby1saW5lMiB7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1pbmZvLXRpdGxlIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTRUNUSU9OIFNIT1dTICovXFxyXFxuLm1haW4tc2hvd3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvd3MtbGlzdCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gIGdhcDogNTBweDtcXHJcXG4gIHBhZGRpbmc6IDI0cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnNob3dzLWxpc3QgbGkgaW1nIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1pbmZvIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi5zaG93LWxpa2VzIHtcXHJcXG4gIHBhZGRpbmc6IDAgMTBweDtcXHJcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hvdy1idG4ge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xcclxcbiAgY29sb3I6IHZhcigtLXRlcmNpYXJ5KTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2sge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubm8tc2Nyb2xsIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuaW1wb3J0IGdldE1vdmllcyBmcm9tICcuL21vZHVsZXMvc2hvd3MtYXBpLmpzJztcbmltcG9ydCByZW5kZXJTaG93cyBmcm9tICcuL21vZHVsZXMvcmVuZGVyLWhvbWUuanMnO1xuaW1wb3J0IGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMgZnJvbSAnLi9tb2R1bGVzL21vZGFscy5qcyc7XG5cbmNvbnN0IHN0YXJ0QXBwID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzaG93cyA9IGF3YWl0IGdldE1vdmllcygpO1xuICByZW5kZXJTaG93cyhzaG93cyk7XG4gIGNvbW1lbnRzRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbnN0YXJ0QXBwKCk7XG4iXSwibmFtZXMiOlsiZ2V0TW92aWVzIiwiY3JlYXRlTW9kYWxIVE1MIiwibW92aWUiLCJuYW1lIiwic3VtbWFyeSIsInByZW1pZXJlZCIsImdlbnJlcyIsImxhbmd1YWdlIiwiaW1hZ2UiLCJtZWRpdW0iLCJpbWciLCJtb2RhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImJvZHkiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwiZ2VucmVzTGlzdCIsImZvckVhY2giLCJnZW5yZSIsImxpIiwiZmlsdGVyTW92aWUiLCJpZCIsIm1vdmllcyIsImZpbHRlciIsInByZXZlbnRTY3JvbGwiLCJjbGFzc0xpc3QiLCJhZGQiLCJhbGxvd1Njcm9sbCIsInJlbW92ZSIsImNsb3NlTW9kYWwiLCJub2RlIiwicGFyZW50Tm9kZSIsIm1vZGFsRXZlbnRMaXN0ZW5lcnMiLCJjbG9zZSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlTW9kYWwiLCJjb21tZW50c0V2ZW50TGlzdGVuZXJzIiwiYnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidXR0b24iLCJjb25zb2xlIiwibG9nIiwicmVuZGVyU2hvd3MiLCJzaG93cyIsInNob3dzQ29udGFpbmVyIiwic2hvdyIsImxpc3RJdGVtIiwiZmV0Y2hNb3ZpZXMiLCJhcGkiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiYXJyYXkiLCJsZW5ndGgiLCJtb3ZpZXNBcnJheSIsInB1c2giLCJzdGFydEFwcCJdLCJzb3VyY2VSb290IjoiIn0=