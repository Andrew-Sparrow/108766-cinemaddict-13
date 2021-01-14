import CommentView from "../view/comments/comment-view";

import {
  remove,
  render,
  RenderPosition, replace,
} from "../utils/render-utils";
import {UpdateTypeForRerender, UserActionForModel} from "../utils/consts";

export default class PopupCommentPresenter {
  constructor(
      commentContainer,
      handleDeleteComment
  ) {
    this._commentContainer = commentContainer.getElement();
    this._handleDeleteComment = handleDeleteComment;

    this._filmCommentComponent = null;

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(comment, commentFeatures = {}) {
    this._comment = comment;
    const prevFilmCommentComponent = this._filmCommentComponent;

    this._filmCommentComponent = new CommentView(this._comment, commentFeatures);
    this._filmCommentComponent.setDeleteCommentClick(this._handleDeleteCommentClick);

    if (prevFilmCommentComponent === null) {
      render(this._commentContainer, this._filmCommentComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmCommentComponent, prevFilmCommentComponent);
    remove(prevFilmCommentComponent);
  }

  _handleDeleteCommentClick(deletedCommentID) {

    this.init(this._comment, {isDeleting: true, isDisabled: true});

    this._handleDeleteComment(
        UpdateTypeForRerender.DELETE_COMMENT,
        UserActionForModel.DELETE_ITEM,
        deletedCommentID
    );
  }
}
