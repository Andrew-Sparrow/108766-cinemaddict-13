import CommentsView from "../view/comments-view";
import {remove} from "../utils/utils";
import PopupCommentPresenter from "./popup-comment-presenter";
import {render, RenderPosition} from "../utils/render-utils";

export default class PopupCommentsPresenter {
  constructor(commentsContainer) {
    this._commentsContainer = commentsContainer;
    this._listRenderedComments = [];
  }

  init(film) {
    this._commentsID = film.comments;
    this._filmCommentsComponent = new CommentsView();

    render(this._commentsContainer, this._filmCommentsComponent, RenderPosition.AFTEREND);

    this._renderComments(this._commentsID);
  }

  destroy() {
    this._clearComments();
    remove(this._filmCommentsComponent);
  }

  _clearComments() {
    this._listRenderedComments.forEach((commentPresenter) => commentPresenter.destroy());
  }

  _renderComment(commentID) {
    this._commentPresenter = new PopupCommentPresenter(this._filmCommentsComponent);
    this._commentPresenter.init(commentID);
    this._listRenderedComments.push(this._commentPresenter);
  }

  _renderComments(commentsID) {
    commentsID.forEach((commentID) => this._renderComment(commentID));
  }
}
