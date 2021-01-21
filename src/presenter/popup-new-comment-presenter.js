import NewCommentView from "../view/comments/new-comment-view";
import {BLANK_COMMENT} from "../utils/consts";

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
      handleViewActionForCommentsModel
  ) {
    this._newCommentContainer = newCommentContainer;
    this._handleViewActionForCommentsModel = handleViewActionForCommentsModel;

    this._newCommentComponent = null;

    this._handleAddNewComment = this._handleAddNewComment.bind(this);
  }

  init(commentData, commentFeatures = {isDisabled: false}) {
    const prevNewCommentComponent = this._newCommentComponent;

    this._newCommentComponent = new NewCommentView(commentData, commentFeatures);
    this._newCommentComponent.setCommentSubmitHandler(this._handleAddNewComment);

    if (prevNewCommentComponent === null) {
      render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._newCommentComponent, prevNewCommentComponent);
      remove(prevNewCommentComponent);
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.init({isDisabled: false});
    };

    this._newCommentComponent.shake(resetFormState);
  }

  setTextAreaFocus() {
    this._newCommentComponent.getTextArea().focus();
  }

  removeCommitSubmitListener() {
    this._newCommentComponent.removeCommentSubmitHandler();
  }

  _handleAddNewComment(commentData) {
    if (!isOnline()) {
      toast(`You can not save comment offline`);
      this._newCommentComponent.shake();
      return;
    }

    this.init(Object.assign({}, BLANK_COMMENT), {isDisabled: true});

    this._handleViewActionForCommentsModel(
        UpdateTypeForRerender.ADD_COMMENT,
        UserActionForModel.ADD_ITEM,
        commentData
    );
  }
}
