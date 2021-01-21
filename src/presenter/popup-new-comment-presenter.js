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
      container,
      handleViewActionForCommentsModel
  ) {
    this._container = container;
    this._handleViewActionForCommentsModel = handleViewActionForCommentsModel;

    this._component = null;

    this._handleAddNewComment = this._handleAddNewComment.bind(this);
  }

  init(commentData, commentFeatures = {isDisabled: false}) {
    const prevNewCommentComponent = this._component;

    this._component = new NewCommentView(commentData, commentFeatures);
    this._component.setSubmitHandler(this._handleAddNewComment);

    if (prevNewCommentComponent === null) {
      render(this._container, this._component, RenderPosition.BEFOREEND);
    } else {
      replace(this._component, prevNewCommentComponent);
      remove(prevNewCommentComponent);
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.init({isDisabled: false});
    };

    this._component.shake(resetFormState);
  }

  setTextAreaFocus() {
    this._component.getTextArea().focus();
  }

  removeSubmitListener() {
    this._component.removeSubmitHandler();
  }

  _handleAddNewComment(commentData) {
    if (!isOnline()) {
      toast(`You can not save comment offline`);
      this._component.shake();
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
