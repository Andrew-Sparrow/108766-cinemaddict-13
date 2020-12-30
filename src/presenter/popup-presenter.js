import PopupView from "../view/popup-view";
import CommentsModel from "../model/comments-model";

import PopupFeaturesPresenter from "./popup-features-presenter";
import PopupCommentsPresenter from "./popup-comments-presenter";
import PopupNewCommentPresenter from "./popup-new-comment-presenter";

import {
  BLANK_COMMENT,
  UpdateTypeForRerender,
  UserActionForModel
} from "../utils/consts";

import {
  remove,
  render,
  RenderPosition
} from "../utils/render-utils";

export default class PopupPresenter {
  constructor(handleChangeData) {
    this._popupContainerElement = document.body.querySelector(`.footer`);

    this._handleChangeData = handleChangeData;

    this._popupComponent = null;

    this._newCommentPresenter = null;

    this._temporaryNewCommentData = Object.assign({}, BLANK_COMMENT);

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._clearTemporaryNewCommentData = this._clearTemporaryNewCommentData.bind(this);

    this._handleViewActionForCommentsModel = this._handleViewActionForCommentsModel.bind(this);
    this._handleCommentsModelEventForPopupRerender = this._handleCommentsModelEventForPopupRerender.bind(this);
  }

  init(film) {
    this._film = film;

    const prevPopupComponent = this._popupComponent;

    this._popupComponent = new PopupView(this._film);

    this._commentsModel = new CommentsModel();
    this._commentsModel.setItems(film.comments);
    this._commentsModel.addObserver(this._handleCommentsModelEventForPopupRerender);

    this._featuresPresenter = new PopupFeaturesPresenter(
        this._popupComponent.getFeaturesContainerElement(),
        this._handleChangeData
    );

    document.addEventListener(`keydown`, this._handleEscKeyDown);

    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    if (prevPopupComponent === null) {
      render(this._popupContainerElement, this._popupComponent, RenderPosition.AFTEREND);

      this._renderInnerElements();
    } else {
      // rerender needs for handle delete comment click
      remove(prevPopupComponent);

      render(this._popupContainerElement, this._popupComponent, RenderPosition.AFTEREND);

      this._renderInnerElements();
    }
  }

  _renderInnerElements() {
    this._renderFeaturesBlock();
    this._renderCommentsBlock();
    this._renderNewCommentBlock();
  }

  _handleViewActionForCommentsModel(actionTypeModel, updatedItem) {
    switch (actionTypeModel) {
      case UserActionForModel.DELETE_ITEM:
        this._commentsModel.deleteItem(updatedItem);
        break;
      case UserActionForModel.ADD_ITEM:
        this._commentsModel.addItem(updatedItem);
        break;
    }
  }

  _handleCommentsModelEventForPopupRerender() {
    this._film.comments = this._commentsModel.getItems();
    this.init(this._film);
    this._handleChangeData(UpdateTypeForRerender.MINOR, Object.assign({}, this._film));
  }

  _renderFeaturesBlock() {
    this._featuresPresenter.init(this._film);
  }

  _renderCommentsBlock() {
    const commentsPresenter = new PopupCommentsPresenter(
        this._popupComponent.getCommentsTitleElement(),
        this._handleViewActionForCommentsModel
    );

    commentsPresenter.init(this._film);
  }

  _renderNewCommentBlock() {
    this._newCommentPresenter = new PopupNewCommentPresenter(
        this._popupComponent.getCommentsWrapElement(),
        this._handleViewActionForCommentsModel,
        this._clearTemporaryNewCommentData
    );
    this._newCommentPresenter.init(this._temporaryNewCommentData);
  }

  _clearTemporaryNewCommentData() {
    this._temporaryNewCommentData = Object.assign({}, BLANK_COMMENT);
  }

  _handlePopupCloseClick() {
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    this._featuresPresenter.destroy();
    this._clearTemporaryNewCommentData();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
      this._featuresPresenter.destroy();
      this._clearTemporaryNewCommentData();
    }
  }
}
