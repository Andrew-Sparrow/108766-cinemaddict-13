import PopupView from "../view/popup/popup-view";
import CommentsModel from "../model/comments-model";

import PopupFeaturesPresenter from "./popup-features-presenter";
import PopupCommentsPresenter from "./popup-comments-presenter";
import PopupNewCommentPresenter from "./popup-new-comment-presenter";
import CommentsTitlePresenter from "./comments-title-presenter";
import LoadingView from "../view/loading-view";
import NoInternetConnectionView from "../view/comments/no-connection-view";

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
  constructor(handleChangeData, apiWithProvider) {
    this._popupContainerElement = document.body.querySelector(`.footer`);

    this._handleChangeData = handleChangeData;
    this._apiWithProvider = apiWithProvider;

    this._popupComponent = null;

    this._newCommentPresenter = null;

    this._loadingComponent = new LoadingView();
    this._noInternetConnectionComponent = new NoInternetConnectionView();

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleViewActionForCommentsModel = this._handleViewActionForCommentsModel.bind(this);
    this._handleCommentsModelEventForPopupRerender = this._handleCommentsModelEventForPopupRerender.bind(this);
  }

  init(film) {
    this._film = film;

    const prevPopupComponent = this._popupComponent;

    this._popupComponent = new PopupView(this._film);

    this._commentsPresenter = new PopupCommentsPresenter(
        this._popupComponent.getCommentsWrapElement(),
        this._handleViewActionForCommentsModel
    );

    this._newCommentPresenter = new PopupNewCommentPresenter(
        this._popupComponent.getCommentsWrapElement(),
        this._handleViewActionForCommentsModel
    );

    this._commentsTitlePresenter = new CommentsTitlePresenter(this._popupComponent.getCommentsWrapElement());

    this._commentsModel = new CommentsModel();

    this._apiWithProvider.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setItems(UpdateTypeForRerender.INIT, comments);
      })
      .catch(() => {
        this._removeLoading();
        this._renderCommentsTitle();
        this._renderNoInternetConnection();
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

  _handleViewActionForCommentsModel(rerenderType, actionTypeModel, updatedItemID) {
    switch (actionTypeModel) {
      case UserActionForModel.DELETE_ITEM:
        this._apiWithProvider.deleteComment(updatedItemID)
          .then(() => {
            this._commentsModel.deleteItem(rerenderType, updatedItemID);
          })
          .catch(() => {
            this._commentsPresenter.getRenderedCommentPresenter(updatedItemID).setAborting();
          });
        break;
      case UserActionForModel.ADD_ITEM:
        this._apiWithProvider.addComment(this._film, updatedItemID)
          .then((response) => {
            // this._commentsModel.clear();
            const commentsAdaptedToClient = response.comments.map((comment) => CommentsModel.adaptToClient(comment));
            this._commentsModel.setItems(rerenderType, commentsAdaptedToClient);
          })
          .catch(() => {
            this._newCommentPresenter.setAborting();
          });
        break;
    }
  }

  _handleCommentsModelEventForPopupRerender(rerenderType) {
    this._film.comments = this._commentsModel.getItems().map((comment) => comment.id);

    switch (rerenderType) {
      case UpdateTypeForRerender.ADD_COMMENT:

        this._renderCommentsTitle();

        this._renderCommentsBlock();

        this._renderNewCommentBlock();

        this._handleChangeData(
            UserActionForModel.UPDATE_COMMENTS,
            UpdateTypeForRerender.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: this._commentsModel.getItems().map((comment) => comment.id)
                }
            )
        );
        break;

      case UpdateTypeForRerender.DELETE_COMMENT:

        this._renderCommentsTitle();

        this._renderCommentsBlock();

        this._handleChangeData(
            UserActionForModel.UPDATE_COMMENTS,
            UpdateTypeForRerender.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: this._commentsModel.getItems().map((comment) => comment.id)
                }
            )
        );
        break;

      case UpdateTypeForRerender.INIT:

        this._removeLoading();

        this._removeNoInternetConnection();

        this._renderCommentsTitle();

        this._renderCommentsBlock();

        this._renderNewCommentBlock();
        break;
    }
  }

  _renderLoading() {
    render(this._popupComponent.getCommentsWrapElement(), this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _removeLoading() {
    remove(this._loadingComponent);
  }

  _renderNoInternetConnection() {
    render(this._popupComponent.getCommentsWrapElement(), this._noInternetConnectionComponent, RenderPosition.BEFOREEND);
  }

  _removeNoInternetConnection() {
    remove(this._noInternetConnectionComponent);
  }

  _renderFeaturesBlock() {
    this._featuresPresenter.init(this._film);
  }

  _renderCommentsTitle() {
    this._commentsTitlePresenter.init(this._film);
  }

  _renderCommentsBlock() {
    this._commentsPresenter.init(this._commentsModel.getItems());
  }

  _renderNewCommentBlock() {

    // this._newCommentPresenter.init({});
    this._newCommentPresenter.init(Object.assign({}, BLANK_COMMENT), {isDisabled: false});
  }

  _clearNewCommentBlock() {
    this._newCommentPresenter.destroy();
  }

  _handlePopupCloseClick() {
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    this._featuresPresenter.destroy();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
      this._featuresPresenter.destroy();
    }
  }
}
