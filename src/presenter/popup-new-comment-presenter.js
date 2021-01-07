import NewCommentView from "../view/comments/new-comment-view";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

import {UserActionForModel} from "../utils/consts";

export default class PopupNewCommentPresenter {
  constructor(
      newCommentContainer,
      handleViewActionForCommentsModel,
      clearTemporaryCommentData
  ) {
    this._newCommentContainer = newCommentContainer;
    this._handleViewActionForCommentsModel = handleViewActionForCommentsModel;
    this._clearTemporaryCommentData = clearTemporaryCommentData;

    this._handleAddNewComment = this._handleAddNewComment.bind(this);
  }

  init(newCommentData) {
    this._newCommentComponent = new NewCommentView(newCommentData);

    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setCommentSubmitHandler(this._handleAddNewComment);
  }

  destroy() {
    remove(this._newCommentComponent);
  }

  _handleAddNewComment(newCommentID) {
    this._handleViewActionForCommentsModel(UserActionForModel.ADD_ITEM, newCommentID);
    this._clearTemporaryCommentData();
  }
}
