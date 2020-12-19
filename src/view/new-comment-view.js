import Smart from "./smart";

const getNewCommentTemplate = (checkedEmoji) => {
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
                 ${checkedEmoji === `smile` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-sleeping"
                value="sleeping"
                ${checkedEmoji === `sleeping` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-puke"
                value="puke"
                ${checkedEmoji === `puke` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-angry"
                value="angry"
                ${checkedEmoji === `angry` ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>`;
};

export default class newCommentView extends Smart {
  constructor(checkedEmoji) {
    super();
    this._checkedEmoji = checkedEmoji;
    this._chosenEmotionContainer = this.getElement(`.film-details__add-emoji-label`);

    this._commentSubmitHandler = this._commentSubmitHandler.bind();

    this._setInnerHandlers();
  }

  getTemplate() {
    return getNewCommentTemplate(this._checkedEmoji);
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

  _emotionClickHandler(evt) {
    evt.preventDefault();

    if (this._chosenEmotionContainer.contains(this._imageElement)) {
      this._imageElement.src = evt.target.getAttribute(`src`);
    } else {
      this._imageElement.width = 55;
      this._imageElement.height = 55;
      this._chosenEmotionContainer.appendChild(this._imageElement);
      this._imageElement.src = evt.target.getAttribute(`src`);
    }

    this.updateData(); // TODO
  }

  _commentSubmitHandler(evt) {
    evt.preventDefault();
    // this._callback.formSubmit(); // TODO
  }

  _commentInputHandler() {
    // evt.preventDefault();
    // this.updateData({
    //   description: evt.target.value
    // }, true); TODO
    // console.log(evt.target.value);
  }

  _setInnerHandlers() {
    this.getElement(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emotionClickHandler);

    this.getElement(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  setCommentSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.film-details__comment-input`)
     .addEventListener(`keydown`, this._commentSubmitHandler);
  }
}
