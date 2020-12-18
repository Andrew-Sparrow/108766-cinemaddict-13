import CommentsView from "../view/comments-view";
import {remove} from "../utils/utils";
import CommentPresenter from "./comment-presenter";
import {render, RenderPosition} from "../utils/render-utils";

export default class CommentsPresenter {
  constructor(commentsContainer) {
    this._commentsContainer = commentsContainer;
    this._listRenderedComments = [];
  }

  init(commentsID) {
    this._commentsID = commentsID;
    this._filmCommentsComponent = new CommentsView(this._commentsID);
    // this._filmCommentsElement = this._filmCommentsComponent;

    render(this._commentsContainer, this._filmCommentsComponent, RenderPosition.BEFOREEND);

    this._renderComments(commentsID);
  }

  destroy() {
    this._listRenderedComments.forEach((commentPresenter) => commentPresenter.destroy());
    remove(this._filmCommentsComponent);
  }

  _renderComment(commentID) {
    this._commentPresenter = new CommentPresenter(this._filmCommentsComponent);
    this._commentPresenter.init(commentID);
    this._listRenderedComments.push(this._commentPresenter);
  }

  _renderComments(commentsID) {
    commentsID.forEach((commentID) => this._renderComment(commentID));
  }
}
