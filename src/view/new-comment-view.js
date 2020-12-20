import Smart from "./smart";

const BLANK_COMMENT = {
  id: null,
  text: ``,
  emotion: null,
  author: null,
  date: null,
};

const getNewCommentTemplate = (comment) => {
  const {
    text,
    emotion
  } = comment;

  return `<div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden"
                 name="comment-emoji"
                 type="radio"
                 id="emoji-smile"
                 value="smile"
                 ${emotion === `smile` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji="smile">
              </label>

              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-sleeping"
                value="sleeping"
                ${emotion === `sleeping` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji="sleeping">
              </label>

              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-puke"
                value="puke"
                ${emotion === `puke` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji="puke">
              </label>

              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-angry"
                value="angry"
                ${emotion === `angry` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emoji="angry">
              </label>
            </div>
          </div>`;
};

export default class NewCommentView extends Smart {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._data = comment;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return getNewCommentTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCommentSubmitHandler(this._callback.formSubmit);
  }

  reset(film) {
    // this.updateData(
    //   TaskEdit.parseTaskToData(task)
    // );
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value
    }, true);
  }

  _commentSubmitHandler(evt) {
    // evt.preventDefault();
    // this._callback.formSubmit(); // TODO
  }

  _setInnerHandlers() {
    this.getElement(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emojiClickHandler);

    this.getElement(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === `IMG`) {
      this.updateData({emotion: evt.target.dataset.emoji});
    }

    const textAreaElement = this.getElement(`.film-details__comment-input`);
    textAreaElement.focus({preventScroll: false});

    // set cursor in the end of line
    const lengthTextArea = textAreaElement.value.trim().length;
    textAreaElement.setSelectionRange(lengthTextArea, lengthTextArea);
  }

  setCommentSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.film-details__comment-input`)
     .addEventListener(`keydown`, this._commentSubmitHandler);
  }
}
