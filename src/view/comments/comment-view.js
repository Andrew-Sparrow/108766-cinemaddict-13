import {collectionOfComments} from "../../presenter/board-presenter";
import {formatCommentDate} from "../../utils/utils";
import Smart from "../smart";

const getCommentTemplate = (commentID) => {

  const comment = collectionOfComments.get(commentID);

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
                <button class="film-details__comment-delete" data-comment-id="${commentID}">Delete</button>
              </p>
            </div>
          </li>`;
};

export default class CommentView extends Smart {
  constructor(commentID) {
    super();
    this._commentID = commentID;

    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
  }

  getTemplate() {
    return getCommentTemplate(this._commentID);
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
