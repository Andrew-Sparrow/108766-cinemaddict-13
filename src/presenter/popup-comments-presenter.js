import CommentsView from "../view/comments/comments-view";
import PopupCommentPresenter from "./popup-comment-presenter";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

import {UpdateTypeForRerender, UserActionForModel} from "../utils/consts";

export default class PopupCommentsPresenter {
  constructor(commentsContainer, handleCommentsChange) {
    this._commentsContainer = commentsContainer;
    this._handleCommentsChange = handleCommentsChange;

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(filmComments) {
    this._filmCommentsID = filmComments;

    this._popupCommentsComponent = new CommentsView();

    render(this._commentsContainer, this._popupCommentsComponent, RenderPosition.BEFOREEND);
    this._renderComments(this._filmCommentsID);
  }

  destroy() {
    remove(this._popupCommentsComponent);
  }

  _renderComment(comment) {
    this._commentPresenter = new PopupCommentPresenter(
        this._popupCommentsComponent,
        this._handleDeleteCommentClick
    );
    this._commentPresenter.init(comment);
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  _handleDeleteCommentClick(deletedCommentID) {
    this._handleCommentsChange(
        UpdateTypeForRerender.PATCH,
        UserActionForModel.DELETE_ITEM,
        deletedCommentID
    );
  }
}
