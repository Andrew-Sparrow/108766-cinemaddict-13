import {formatCommentDate} from "../../utils/utils";
import Smart from "../smart";

const getCommentTemplate = (comment, commentFeatures) => {

  const {
    id,
    emotion,
    text,
    author,
    date
  } = comment;

  const {
    isDisabled,
    isDeleting
  } = commentFeatures;

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${formatCommentDate(date)}</span>
                <button
                  type="button"
                  class="film-details__comment-delete"
                  data-comment-id="${id}"
                  ${isDisabled ? `disabled` : ``}
                >
                  ${isDeleting ? `Deleting...` : `Delete`}
                </button>
              </p>
            </div>
          </li>`;
};

export default class CommentView extends Smart {
  constructor(comment, commentFeatures) {
    super();
    this._comment = comment;
    this._commentFeatures = commentFeatures;

    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
  }

  getTemplate() {
    return getCommentTemplate(this._comment, this._commentFeatures);
  }

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentDeleteClick(evt.target.dataset.commentId);
  }

  setDeleteCommentClick(callback) {
    this._callback.commentDeleteClick = callback;
    this.getElement(`.film-details__comment-delete`).addEventListener(`click`, this._deleteCommentClickHandler);
  }
}
