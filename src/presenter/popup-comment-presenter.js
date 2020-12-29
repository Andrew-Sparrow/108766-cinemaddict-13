import CommentView from "../view/comment-view";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

export default class PopupCommentPresenter {
  constructor(commentContainer, handleCommentsChange) {
    this._commentContainer = commentContainer.getElement();
    this._handleCommentsChange = handleCommentsChange;
  }

  init(commentID) {
    this._commentID = commentID;
    this._filmCommentComponent = new CommentView(this._commentID);
    this._filmCommentComponent.setDeleteCommentClick(this._handleCommentsChange);

    render(this._commentContainer, this._filmCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._filmCommentComponent);
  }
}
