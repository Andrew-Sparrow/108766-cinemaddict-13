import CommentsView from "../view/comments/comments-view";
import PopupCommentPresenter from "./popup-comment-presenter";

import {
  remove,
  render,
  RenderPosition, replace,
} from "../utils/render-utils";

import {
  UpdateTypeForRerender,
  UserActionForModel
} from "../utils/consts";

export default class PopupCommentsPresenter {
  constructor(commentsContainer, handleCommentsChange) {
    this._commentsContainer = commentsContainer;
    this._handleCommentsChange = handleCommentsChange;

    this._popupCommentsComponent = null;
    // this._commentPresenter = null;

    // this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(filmComments) {
    this._filmComments = filmComments;

    const prevPopupCommentsComponent = this._popupCommentsComponent;

    this._popupCommentsComponent = new CommentsView();

    // this._commentPresenter = new PopupCommentPresenter(
    //     this._popupCommentsComponent,
    //     // this._handleDeleteCommentClick
    //     this._handleCommentsChange
    // );

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

  _cleanCommentsList() {
    this._popupCommentsComponent.getElement().innerHTML = ``;
  }

  _renderComment(comment) {
    const commentPresenter = new PopupCommentPresenter(
        this._popupCommentsComponent,
        // this._handleDeleteCommentClick
        this._handleCommentsChange
    );

    commentPresenter.init(comment);
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  // _handleDeleteCommentClick(deletedCommentID) {
  //   this._handleCommentsChange(
  //       UpdateTypeForRerender.DELETE_COMMENT,
  //       UserActionForModel.DELETE_ITEM,
  //       deletedCommentID
  //   );
  // }
}
