import Smart from "../smart";

import he from "he";

import {ENTER_KEY_CODE} from "../../utils/consts";

const getNewCommentTemplate = (commentData, commentFeatures) => {
  const {
    text,
    emotion
  } = commentData;

  const {
    isDisabled
  } = commentFeatures;

  return `<div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ``}
            </div>

            <label class="film-details__comment-label tooltip">
              <textarea
                class="film-details__comment-input"
                placeholder="Select reaction below and write comment here"
                name="comment"
                ${isDisabled ? `disabled` : ``}>${he.encode(text)}</textarea>
              <span class="tooltiptext">Please, write comment and choose emoji</span>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden"
                 name="comment-emoji"
                 type="radio"
                 id="emoji-smile"
                 value="smile"
                 ${emotion === `smile` ? `checked` : ``}
                 ${isDisabled ? `disabled` : ``} disabled>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji="smile">
              </label>

              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-sleeping"
                value="sleeping"
                ${emotion === `sleeping` ? `checked` : ``}
                ${isDisabled ? `disabled` : ``}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji="sleeping">
              </label>

              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-puke"
                value="puke"
                ${emotion === `puke` ? `checked` : ``}
                ${isDisabled ? `disabled` : ``}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji="puke">
              </label>

              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-angry"
                value="angry"
                ${emotion === `angry` ? `checked` : ``}
                ${isDisabled ? `disabled` : ``}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emoji="angry">
              </label>
            </div>
          </div>`;
};

export default class NewCommentView extends Smart {
  constructor(data, features) {
    super();
    this._data = data;
    this._commentFeatures = features;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._inputHandler = this._inputHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return getNewCommentTemplate(this._data, this._commentFeatures);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.formSubmit);
  }

  getTextArea() {
    return this.getElement(`.film-details__comment-input`);
  }

  _inputHandler(evt) {
    evt.preventDefault();

    this.updateData({text: evt.target.value.trim()}, true);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === `IMG`) {
      this.updateData({emotion: evt.target.dataset.emoji});
    }

    const textAreaElement = this.getElement(`.film-details__comment-input`);
    textAreaElement.focus({preventScroll: false});

    // set cursor in the end of the line
    const lengthTextArea = textAreaElement.value.trim().length;
    textAreaElement.setSelectionRange(lengthTextArea, lengthTextArea);
  }

  _setInnerHandlers() {

    this.getElement(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emojiClickHandler);

    this.getElement(`.film-details__comment-input`)
      .addEventListener(`input`, this._inputHandler);
  }

  _submitHandler(evt) {
    const textAreaElement = this.getElement(`.film-details__comment-input`);

    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === ENTER_KEY_CODE) {
      if (this._data.text && this._data.emotion) {

        this._data.date = new Date();

        this._callback.formSubmit(this._data);

        this._data.text = ``;
        this._data.emotion = null;

      } else {
        textAreaElement.style.border = `2px solid #ff0000`;
        this.getElement(`.tooltiptext`).style.visibility = `visible`;
      }
    }
  }

  setSubmitHandler(callback) {
    this._callback.formSubmit = callback;

    document.addEventListener(`keydown`, this._submitHandler);
  }

  removeSubmitHandler() {
    document.removeEventListener(`keydown`, this._submitHandler);
  }
}
