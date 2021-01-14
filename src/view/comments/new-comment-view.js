import Smart from "../smart";
import he from "he";

import {BLANK_COMMENT} from "../../utils/consts";

const getNewCommentTemplate = (comment, commentFeatures) => {
  const {
    text,
    emotion
  } = comment;

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
                 ${isDisabled ? `disabled` : ``}>
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
  constructor(comment, commentFeatures) {
    super();
    this._data = comment;
    this._commentFeatures = commentFeatures;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return getNewCommentTemplate(this._data, this._commentFeatures);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCommentSubmitHandler(this._callback.formSubmit);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();

    this._data.text = evt.target.value.trim();
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === `IMG`) {
      this._data.emotion = evt.target.dataset.emoji;
      this.updateElement();
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
      .addEventListener(`input`, this._commentInputHandler);
  }

  _commentSubmitHandler(evt) {
    const textAreaElement = this.getElement(`.film-details__comment-input`);

    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 13) {
      if (this._data.emotion && this._data.text) {

        this._data.date = new Date();

        this._callback.formSubmit();

        this._data = Object.assign({}, BLANK_COMMENT);

      } else {
        textAreaElement.style.border = `2px solid #ff0000`;
        this.getElement(`.tooltiptext`).style.visibility = `visible`;
      }
    }
  }

  setCommentSubmitHandler(callback) {
    this._callback.formSubmit = callback;

    document.addEventListener(`keydown`, this._commentSubmitHandler);
  }
}
