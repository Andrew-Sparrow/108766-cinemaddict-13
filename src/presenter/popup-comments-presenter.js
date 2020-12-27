import CommentsView from "../view/comments-view";
import PopupCommentPresenter from "./popup-comment-presenter";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

export default class PopupCommentsPresenter {
  constructor(commentsContainer) {
    this._commentsContainer = commentsContainer;
    this._listRenderedComments = [];

    this._popupCommentsComponent = null;
  }

  init(film) {
    this._commentsID = film.comments;
    const prevPopupCommentsComponent = this._popupCommentsComponent;

    this._popupCommentsComponent = new CommentsView();

    if (prevPopupCommentsComponent === null) {
      render(this._commentsContainer, this._popupCommentsComponent, RenderPosition.AFTEREND);
      this._renderComments(this._commentsID);
    }

    if (this._commentsContainer.contains(prevPopupCommentsComponent)) {
      this._clearComments();
      this._renderComments(this._commentsID);
    }
    remove(prevPopupCommentsComponent);
  }

  destroy() {
    this._clearComments();
    remove(this._popupCommentsComponent);
  }

  _clearComments() {
    this._listRenderedComments.forEach((commentPresenter) => commentPresenter.destroy());
    this._listRenderedComments = [];
  }

  _renderComment(commentID) {
    this._commentPresenter = new PopupCommentPresenter(this._popupCommentsComponent);
    this._commentPresenter.init(commentID);
    this._listRenderedComments.push(this._commentPresenter);
  }

  _renderComments(commentsID) {
    commentsID.forEach((commentID) => this._renderComment(commentID));
  }
}
