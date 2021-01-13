import CommentView from "../view/comments/comment-view";

import {
  render,
  RenderPosition,
} from "../utils/render-utils";

export default class PopupCommentPresenter {
  constructor(
      commentContainer,
      handleDeleteComment
  ) {
    this._commentContainer = commentContainer.getElement();
    this._handleDeleteComment = handleDeleteComment;
  }

  init(comment) {
    this._comment = comment;
    this._filmCommentComponent = new CommentView(this._comment);
    this._filmCommentComponent.setDeleteCommentClick(this._handleDeleteComment);

    render(this._commentContainer, this._filmCommentComponent, RenderPosition.BEFOREEND);
  }
}
