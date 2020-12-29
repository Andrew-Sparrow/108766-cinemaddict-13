import CommentView from "../view/comment-view";

import {
  remove,
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

  init(commentID) {
    this._commentID = commentID;
    this._filmCommentComponent = new CommentView(this._commentID);
    this._filmCommentComponent.setDeleteCommentClick(this._handleDeleteComment);

    render(this._commentContainer, this._filmCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._filmCommentComponent);
  }
}
