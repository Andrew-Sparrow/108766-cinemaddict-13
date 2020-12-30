import NewCommentView from "../view/new-comment-view";

import {
  remove,
  render,
  RenderPosition
} from "../utils/render-utils";

import {UserActionForModel} from "../utils/consts";

export default class PopupNewCommentPresenter {
  constructor(
      newCommentContainer,
      handleViewActionForModel,
      clearCommentData
  ) {
    this._newCommentContainer = newCommentContainer;
    this._handleViewActionForModel = handleViewActionForModel;
    this._clearCommentData = clearCommentData;

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
    this._clearCommentData();
    this._handleViewActionForModel(UserActionForModel.ADD_ITEM, newCommentID);
  }
}
