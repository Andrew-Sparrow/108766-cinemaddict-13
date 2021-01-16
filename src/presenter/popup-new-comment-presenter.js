import NewCommentView from "../view/comments/new-comment-view";

import {
  remove,
  render,
  replace,
  RenderPosition
} from "../utils/render-utils";

import {
  UpdateTypeForRerender,
  UserActionForModel
} from "../utils/consts";

import {isOnline} from "../utils/common-utils";
import {toast} from "../utils/toast/toast";

export default class PopupNewCommentPresenter {
  constructor(
      newCommentContainer,
      handleViewActionForCommentsModel,
      clearTemporaryCommentData
  ) {
    this._newCommentContainer = newCommentContainer;
    this._handleViewActionForCommentsModel = handleViewActionForCommentsModel;
    this._clearTemporaryCommentData = clearTemporaryCommentData;

    this._newCommentComponent = null;

    this._handleAddNewComment = this._handleAddNewComment.bind(this);
  }

  init(newCommentData, commentFeatures = {}) {
    this._newCommentData = newCommentData;

    const prevNewCommentComponent = this._newCommentComponent;

    this._newCommentComponent = new NewCommentView(this._newCommentData, commentFeatures);
    this._newCommentComponent.setCommentSubmitHandler(this._handleAddNewComment);

    if (prevNewCommentComponent === null) {
      render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._newCommentComponent, prevNewCommentComponent);
    remove(prevNewCommentComponent);
  }

  destroy() {
    remove(this._newCommentComponent);
  }

  setAborting() {
    const resetFormState = () => {
      this.init(this._newCommentData, {isDisabled: false});
    };

    this._newCommentComponent.shake(resetFormState);
  }

  _handleAddNewComment() {
    if (!isOnline()) {
      toast(`You can't save comment offline`);
      return;
    }

    this.init(this._newCommentData, {isDisabled: true});

    this._handleViewActionForCommentsModel(
        UpdateTypeForRerender.ADD_COMMENT,
        UserActionForModel.ADD_ITEM,
        this._newCommentData
    );

    this._clearTemporaryCommentData();
  }
}
