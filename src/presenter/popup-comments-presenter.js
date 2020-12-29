import CommentsView from "../view/comments-view";
import PopupCommentPresenter from "./popup-comment-presenter";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

import {UpdateTypeForRerender, UserActionForModel} from "../utils/consts";

export default class PopupCommentsPresenter {
  constructor(commentsContainer, handleCommentsChange, handleFilmsChanges) {
    this._commentsContainer = commentsContainer;
    this._handleCommentsChange = handleCommentsChange;
    this._handleFilmsChanges = handleFilmsChanges;

    this._listRenderedComments = [];

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmCommentsID = this._film.comments;

    this._popupCommentsComponent = new CommentsView();

    render(this._commentsContainer, this._popupCommentsComponent, RenderPosition.AFTEREND);
    this._renderComments(this._filmCommentsID);
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
    this._commentPresenter = new PopupCommentPresenter(this._popupCommentsComponent, this._handleDeleteCommentClick);
    this._commentPresenter.init(commentID);
    this._listRenderedComments.push(this._commentPresenter);
  }

  _renderComments(commentsID) {
    commentsID.forEach((commentID) => this._renderComment(commentID));
  }

  _handleDeleteCommentClick(deletedCommentID) {
    this._handleCommentsChange(UserActionForModel.DELETE_ITEM, deletedCommentID);
    // this._handleFilmsChanges(UpdateTypeForRerender.MINOR);
  }
}
