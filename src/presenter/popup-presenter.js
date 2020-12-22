import PopupView from "../view/popup-view";
import {remove} from "../utils/utils";

import {
  render,
  RenderPosition,
} from "../utils/render-utils";

import PopupFeaturesPresenter from "./popup-features-presenter";
import PopupCommentsPresenter from "./popup-comments-presenter";
import PopupNewCommentPresenter from "./popup-new-comment-presenter";


export default class PopupPresenter {
  constructor(handleChangeData) {
    this._popupContainerElement = document.body.querySelector(`.footer`);

    this._handleChangeData = handleChangeData;

    this._popupComponent = null;

    this._newCommentPresenter = null;

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;

    this._popupComponent = new PopupView(this._film);

    document.addEventListener(`keydown`, this._handleEscKeyDown);

    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    render(this._popupContainerElement, this._popupComponent, RenderPosition.AFTEREND);

    this._renderFeaturesBlock();
    this._renderCommentsBlock();
    this._renderNewCommentBlock();
  }

  _renderFeaturesBlock() {
    this._featuresPresenter = new PopupFeaturesPresenter(
        this._popupComponent.getFeaturesContainerElement(),
        this._handleChangeData
    );
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
