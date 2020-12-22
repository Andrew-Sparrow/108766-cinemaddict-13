import PopupView from "../view/popup-view";
import {remove} from "../utils/utils";

import {
  render,
  RenderPosition
} from "../utils/render-utils";

import PopupFeaturesPresenter from "./popup-features-presenter";
import PopupCommentsPresenter from "./popup-comments-presenter";
import PopupNewCommentPresenter from "./popup-new-comment-presenter";

export default class PopupPresenter {
  constructor(popupState, handleChangeData) {
    this._popupContainerElement = document.body;

    this._handleChangeData = handleChangeData;

    this._popupComponent = null;
    this._prevPopupComponent = null;
    this._newCommentPresenter = null;
    this._popupState = popupState;

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(film, isRerenderFeatures) {
    this._film = film;
    this._popupState.open = true;

    document.addEventListener(`keydown`, this._handleEscKeyDown);

    this._popupComponent = new PopupView(this._film);

    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    if (this._prevPopupComponent === null) {

      render(this._popupContainerElement, this._popupComponent, RenderPosition.BEFOREEND);

      this._featuresPresenter = new PopupFeaturesPresenter(
          this._popupComponent.getFeaturesContainerElement(),
          this._handleChangeData
      );

      this._renderFeaturesBlock();
      this._renderCommentsBlock();
      this._renderNewCommentBlock();
      this._prevPopupComponent = this._popupComponent;

    } else {
      if (isRerenderFeatures) {
        this._renderFeaturesBlock();
        return;
      }
      remove(this._prevPopupComponent);
      render(this._popupContainerElement, this._popupComponent, RenderPosition.BEFOREEND);

      this._renderFeaturesBlock();
      this._renderCommentsBlock();
      this._renderNewCommentBlock();
      this._prevPopupComponent = this._popupComponent;
    }
  }

  _renderFeaturesBlock() {
    this._featuresPresenter.init(this._film);
  }

  _renderCommentsBlock() {
    const commentsPresenter = new PopupCommentsPresenter(this._popupComponent.getCommentsTitleElement());

    commentsPresenter.init(this._film);
  }

  _renderNewCommentBlock() {
    this._newCommentPresenter = new PopupNewCommentPresenter(this._popupComponent.getCommentsWrapElement());
    this._newCommentPresenter.init();
  }

  _handlePopupCloseClick() {
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
    this._popupState.open = false;
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      remove(this._popupComponent);
      this._popupState.open = false;
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
    }
  }
}
