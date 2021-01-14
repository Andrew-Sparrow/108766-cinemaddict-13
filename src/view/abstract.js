import {createElement} from "../utils/utils";

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method. Not implemented: getTemplate`);
  }

  getElement(selector = ``) {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    // some trick
    // passing selector as an argument to get inner DOM element
    if (selector) {
      return this._element.querySelector(selector);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
