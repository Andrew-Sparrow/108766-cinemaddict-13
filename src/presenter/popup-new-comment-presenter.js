import NewCommentView from "../view/comments/new-comment-view";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

import {UpdateTypeForRerender, UserActionForModel} from "../utils/consts";

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
    this._newCommentData = newCommentData;

    this._newCommentComponent = new NewCommentView(this._newCommentData);

    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setCommentSubmitHandler(this._handleAddNewComment);
  }

  destroy() {
    remove(this._newCommentComponent);
  }

  setSaving() {
    this._newCommentComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  _handleAddNewComment() {

    this._handleViewActionForCommentsModel(
        UpdateTypeForRerender.PATCH,
        UserActionForModel.ADD_ITEM,
        this._newCommentData
    );

    this._clearTemporaryCommentData();
  }
}
