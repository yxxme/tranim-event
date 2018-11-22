'use strict';

let isDetected, animationstartEventName, animationiterationEventName, animationendEventName, transitionendEventName;

function detectEventType(el, types) {
  let type;

  for (let t in types) {
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

  const el = document.createElement('tranimelement');
  const animations = {
    animation: ['animationstart', 'animationiteration', 'animationend'],
    OAnimation: ['oAnimationStart', 'oAnimationIteration', 'oAnimationEnd'],
    MozAnimation: ['animationstart', 'animationiteration', 'animationend'],
    WebkitAnimation: ['webkitAnimationStart', 'webkitAnimationIteration', 'webkitAnimationEnd']
  };
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  const animationEventType = detectEventType(el, animations);

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

const TranimEvent = {
  animationSupport: function () {

    detectEventName();
    return !!animationendEventName;

  },
  transitionSupport: function () {

    detectEventName();
    return !!transitionendEventName;

  },
  onAnimationStart: function (el, handler) {

    detectEventName();
    return animationstartEventName ? eventAdd(el, animationstartEventName, handler) : false;

  },
  offAnimationStart: function (el, handler) {

    detectEventName();
    return animationstartEventName ? eventRemove(el, animationstartEventName, handler) : false;

  },
  onAnimationIteration: function (el, handler) {

    detectEventName();
    return animationiterationEventName ? eventAdd(el, animationiterationEventName, handler) : false;

  },
  offAnimationIteration: function (el, handler) {

    detectEventName();
    return animationiterationEventName ? eventRemove(el, animationiterationEventName, handler) : false;

  },
  onAnimationEnd: function (el, handler) {

    detectEventName();
    return animationendEventName ? eventAdd(el, animationendEventName, handler) : false;

  },
  offAnimationEnd: function (el, handler) {

    detectEventName();
    return animationendEventName ? eventRemove(el, animationendEventName, handler) : false;

  },
  onTransitionEnd: function (el, handler) {

    detectEventName();
    return transitionendEventName ? eventAdd(el, transitionendEventName, handler) : false;

  },
  offTransitionEnd: function (el, handler) {

    detectEventName();
    return transitionendEventName ? eventRemove(el, transitionendEventName, handler) : false;

  },
  onceTransitionEnd: function (el, handler) {

    detectEventName();
    let flag = true;

    return transitionendEventName ? eventAdd(el, transitionendEventName, function (e) {
      if (flag) {
        flag = false;
        handler(e);
      }
    }) : false;

  },
  onceAnimationEnd: function (el, handler) {

    detectEventName();
    let flag = true;

    return animationendEventName ? eventAdd(el, animationendEventName, function (e) {
      if (flag) {
        flag = false;
        handler(e);
      }
    }) : false;

  }
};

export default TranimEvent;
