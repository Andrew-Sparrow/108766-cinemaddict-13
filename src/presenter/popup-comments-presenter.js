import CommentsView from "../view/comments/comments-view";
import PopupCommentPresenter from "./popup-comment-presenter";

import {
  remove,
  render,
  RenderPosition, replace,
} from "../utils/render-utils";

export default class PopupCommentsPresenter {
  constructor(commentsContainer, handleCommentsChange) {
    this._commentsContainer = commentsContainer;
    this._handleCommentsChange = handleCommentsChange;

    this._renderedCommentPresenters = new Map();

    this._popupCommentsComponent = null;
  }

  init(filmComments) {
    this._filmComments = filmComments;

    const prevPopupCommentsComponent = this._popupCommentsComponent;

    this._popupCommentsComponent = new CommentsView();

    if (prevPopupCommentsComponent === null) {
      render(this._commentsContainer, this._popupCommentsComponent, RenderPosition.BEFOREEND);

      this._renderComments(this._filmComments);
    } else {

      this._cleanCommentsList();
      this._renderComments(this._filmComments);
      replace(this._popupCommentsComponent, prevPopupCommentsComponent);
    }
  }

  destroy() {
    remove(this._popupCommentsComponent);
  }

  getRenderedCommentPresenter(commentID) {
    return this._renderedCommentPresenters.get(commentID);
  }

  _cleanCommentsList() {
    this._popupCommentsComponent.getElement().innerHTML = ``;
  }

  _renderComment(comment) {
    const commentPresenter = new PopupCommentPresenter(
        this._popupCommentsComponent,
        this._handleCommentsChange
    );

    commentPresenter.init(comment);
    this._renderedCommentPresenters.set(comment.id, commentPresenter);
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }
}
