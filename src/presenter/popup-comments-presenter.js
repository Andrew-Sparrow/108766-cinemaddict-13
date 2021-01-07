import CommentsView from "../view/comments/comments-view";
import PopupCommentPresenter from "./popup-comment-presenter";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

import {UserActionForModel} from "../utils/consts";

export default class PopupCommentsPresenter {
  constructor(commentsContainer, handleCommentsChange) {
    this._commentsContainer = commentsContainer;
    this._handleCommentsChange = handleCommentsChange;

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(filmCommentsID) {
    this._filmCommentsID = filmCommentsID;

    this._popupCommentsComponent = new CommentsView();

    render(this._commentsContainer, this._popupCommentsComponent, RenderPosition.BEFOREEND);
    this._renderComments(this._filmCommentsID);
  }

  destroy() {
    remove(this._popupCommentsComponent);
  }

  _renderComment(commentID) {
    this._commentPresenter = new PopupCommentPresenter(
        this._popupCommentsComponent,
        this._handleDeleteCommentClick
    );
    this._commentPresenter.init(commentID);
  }

  _renderComments(commentsID) {
    commentsID.forEach((commentID) => this._renderComment(commentID));
  }

  _handleDeleteCommentClick(deletedCommentID) {
    this._handleCommentsChange(UserActionForModel.DELETE_ITEM, deletedCommentID);
  }
}
