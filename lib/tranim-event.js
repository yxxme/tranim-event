(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TranimEvent", [], factory);
	else if(typeof exports === 'object')
		exports["TranimEvent"] = factory();
	else
		root["TranimEvent"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var isDetected, animationstartEventName, animationiterationEventName, animationendEventName, transitionendEventName;

function detectEventType(el, types) {
  var type;

  for (var t in types) {
    if (types.hasOwnProperty(t) && el.style[t] !== undefined) {
      type = types[t];
      break;
    }
  }

  return type;
}

function detectEventName() {
  // if is detected support then exit
  if (isDetected) return;
  isDetected = true;
  var el = document.createElement('tranimelement');
  var animations = {
    animation: ['animationstart', 'animationiteration', 'animationend'],
    OAnimation: ['oAnimationStart', 'oAnimationIteration', 'oAnimationEnd'],
    MozAnimation: ['animationstart', 'animationiteration', 'animationend'],
    WebkitAnimation: ['webkitAnimationStart', 'webkitAnimationIteration', 'webkitAnimationEnd']
  };
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };
  var animationEventType = detectEventType(el, animations);

  if (animationEventType) {
    animationstartEventName = animationEventType[0];
    animationiterationEventName = animationEventType[1];
    animationendEventName = animationEventType[2];
  }

  transitionendEventName = detectEventType(el, transitions);
}

function eventAdd(obj, type, handler) {
  obj.addEventListener(type, handler, false);
  return true;
}

function eventRemove(obj, type, handler) {
  obj.removeEventListener(type, handler, false);
  return true;
}

var TranimEvent = {
  animationSupport: function animationSupport() {
    detectEventName();
    return !!animationendEventName;
  },
  transitionSupport: function transitionSupport() {
    detectEventName();
    return !!transitionendEventName;
  },
  onAnimationStart: function onAnimationStart(el, handler) {
    detectEventName();
    return animationstartEventName ? eventAdd(el, animationstartEventName, handler) : false;
  },
  offAnimationStart: function offAnimationStart(el, handler) {
    detectEventName();
    return animationstartEventName ? eventRemove(el, animationstartEventName, handler) : false;
  },
  onAnimationIteration: function onAnimationIteration(el, handler) {
    detectEventName();
    return animationiterationEventName ? eventAdd(el, animationiterationEventName, handler) : false;
  },
  offAnimationIteration: function offAnimationIteration(el, handler) {
    detectEventName();
    return animationiterationEventName ? eventRemove(el, animationiterationEventName, handler) : false;
  },
  onAnimationEnd: function onAnimationEnd(el, handler) {
    detectEventName();
    return animationendEventName ? eventAdd(el, animationendEventName, handler) : false;
  },
  offAnimationEnd: function offAnimationEnd(el, handler) {
    detectEventName();
    return animationendEventName ? eventRemove(el, animationendEventName, handler) : false;
  },
  onTransitionEnd: function onTransitionEnd(el, handler) {
    detectEventName();
    return transitionendEventName ? eventAdd(el, transitionendEventName, handler) : false;
  },
  offTransitionEnd: function offTransitionEnd(el, handler) {
    detectEventName();
    return transitionendEventName ? eventRemove(el, transitionendEventName, handler) : false;
  },
  onceTransitionEnd: function onceTransitionEnd(el, handler) {
    detectEventName();
    var flag = true;
    return transitionendEventName ? eventAdd(el, transitionendEventName, function (e) {
      if (flag) {
        flag = false;
        handler(e);
      }
    }) : false;
  },
  onceAnimationEnd: function onceAnimationEnd(el, handler) {
    detectEventName();
    var flag = true;
    return animationendEventName ? eventAdd(el, animationendEventName, function (e) {
      if (flag) {
        flag = false;
        handler(e);
      }
    }) : false;
  }
};
var _default = TranimEvent;
exports.default = _default;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=tranim-event.js.map