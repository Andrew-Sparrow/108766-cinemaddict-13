import PopupView from "../view/popup/popup-view";
import CommentsModel from "../model/comments-model";

import PopupFeaturesPresenter from "./popup-features-presenter";
import PopupCommentsPresenter from "./popup-comments-presenter";
import PopupNewCommentPresenter from "./popup-new-comment-presenter";
import CommentsTitlePresenter from "./comments-title-presenter";
import LoadingView from "../view/loading-view";

import {
  BLANK_COMMENT,
  UpdateTypeForRerender,
  UserActionForModel
} from "../utils/consts";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

export default class PopupPresenter {
  constructor(handleChangeData, api) {
    this._popupContainerElement = document.body.querySelector(`.footer`);

    this._handleChangeData = handleChangeData;
    this._api = api;

    this._popupComponent = null;

    this._newCommentPresenter = null;

    this._loadingComponent = new LoadingView();

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

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setItems(UpdateTypeForRerender.INIT, comments);
      })
      .catch(() => {
        this._commentsModel.setItems(UpdateTypeForRerender.INIT, []);
      });

    this._commentsModel.addObserver(this._handleCommentsModelEventForPopupRerender);

    this._featuresPresenter = new PopupFeaturesPresenter(
        this._popupComponent.getFeaturesContainerElement(),
        this._handleChangeData
    );

    document.addEventListener(`keydown`, this._handleEscKeyDown);

    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    if (prevPopupComponent === null) {
      render(this._popupContainerElement, this._popupComponent, RenderPosition.AFTEREND);

      this._renderFeaturesBlock();
      this._renderLoading();

    } else {
      render(this._popupContainerElement, this._popupComponent, RenderPosition.AFTEREND);

      this._renderFeaturesBlock();

      remove(prevPopupComponent);
    }
  }

  _handleViewActionForCommentsModel(rerenderType, actionTypeModel, updatedItem) {
    switch (actionTypeModel) {
      case UserActionForModel.DELETE_ITEM:
        this._commentsModel.deleteItem(rerenderType, updatedItem);
        break;
      case UserActionForModel.ADD_ITEM:
        this._commentsModel.addItem(rerenderType, updatedItem);
        break;
    }
  }

  _handleCommentsModelEventForPopupRerender(rerenderType) {
    this._film.comments = this._commentsModel.getItems().map((comment) => comment.id);

    switch (rerenderType) {
      case UpdateTypeForRerender.PATCH:

        this._clearCommentsTitle();
        this._renderCommentsTitle();

        this._clearPopupComments();
        this._renderCommentsBlock();

        this._clearNewCommentBlock();
        this._renderNewCommentBlock();

        this._handleChangeData(
            UpdateTypeForRerender.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: this._film.comments
                }
            )
        );
        break;

      case UpdateTypeForRerender.INIT:

        remove(this._loadingComponent);

        this._renderCommentsTitle();

        this._renderCommentsBlock();

        this._renderNewCommentBlock();
        break;
    }
  }

  _renderLoading() {
    render(this._popupComponent.getCommentsWrapElement(), this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFeaturesBlock() {
    this._featuresPresenter.init(this._film);
  }

  _renderCommentsTitle() {
    this._commentsTitlePresenter = new CommentsTitlePresenter(this._popupComponent.getCommentsWrapElement());

    this._commentsTitlePresenter.init(this._film);
  }

  _clearCommentsTitle() {
    this._commentsTitlePresenter.destroy();
  }

  _renderCommentsBlock() {
    this._commentsPresenter = new PopupCommentsPresenter(
        this._popupComponent.getCommentsWrapElement(),
        this._handleViewActionForCommentsModel
    );

    this._commentsPresenter.init(this._commentsModel.getItems());
  }

  _clearPopupComments() {
    this._commentsPresenter.destroy();
  }

  _renderNewCommentBlock() {
    this._newCommentPresenter = new PopupNewCommentPresenter(
        this._popupComponent.getCommentsWrapElement(),
        this._handleViewActionForCommentsModel,
        this._clearTemporaryNewCommentData
    );
    this._clearTemporaryNewCommentData();
    this._newCommentPresenter.init(this._temporaryNewCommentData);
  }

  _clearNewCommentBlock() {
    this._newCommentPresenter.destroy();
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
