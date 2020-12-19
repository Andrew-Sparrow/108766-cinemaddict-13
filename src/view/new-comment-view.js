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
            <div class="film-details__add-emoji-label"></div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden"
                 name="comment-emoji"
                 type="radio"
                 id="emoji-smile"
                 value="smile"
                 ${emotion === `smile` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-sleeping"
                value="sleeping"
                ${emotion === `sleeping` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-puke"
                value="puke"
                ${emotion === `puke` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-angry"
                value="angry"
                ${emotion === `angry` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>`;
};

export default class NewCommentView extends Smart {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._comment = comment;
    this._imageElement = document.createElement(`img`);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return getNewCommentTemplate(this._comment);
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

  _commentInputHandler() {
    // evt.preventDefault();
    // this.updateData({
    //   description: evt.target.value
    // }, true); TODO
    // console.log(evt.target.value);
  }

  _commentSubmitHandler(evt) {
    evt.preventDefault();
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

    const chosenEmotionContainer = this.getElement(`.film-details__add-emoji-label`);

    if (chosenEmotionContainer.contains(this._imageElement)) {
      this._imageElement.src = evt.target.getAttribute(`src`);
    } else {
      this._imageElement.width = 55;
      this._imageElement.height = 55;
      chosenEmotionContainer.appendChild(this._imageElement);
      this._imageElement.src = evt.target.getAttribute(`src`);
    }

    this.updateData(); // TODO
  }

  setCommentSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.film-details__comment-input`)
     .addEventListener(`keydown`, this._commentSubmitHandler);
  }
}
