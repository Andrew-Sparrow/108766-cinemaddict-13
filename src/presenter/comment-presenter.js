import CommentView from "../view/comment-view";

import {remove} from "../utils/utils";

import {
  render,
  RenderPosition
} from "../utils/render-utils";

export default class CommentPresenter {
  constructor(commentContainer) {
    this._commentContainer = commentContainer.getElement();
  }

  init(commentID) {
    this._commentID = commentID;
    this._filmCommentComponent = new CommentView(this._commentID);
    render(this._commentContainer, this._filmCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._filmCommentComponent);
  }
}
