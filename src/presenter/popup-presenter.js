import PopupView from "../view/popup-view";
import {remove} from "../utils/utils";

import {
  render,
  RenderPosition
} from "../utils/render-utils";

export default class PopupPresenter {
  constructor() {
    this._popupContainerElement = document.body;
    this._popupComponent = null;
    this._prevPopupComponent = null;

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;

    this._popupComponent = new PopupView(this._film);

    document.addEventListener(`keydown`, this._handleEscKeyDown);
    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    if (this._prevPopupComponent === null) {
      render(this._popupContainerElement, this._popupComponent, RenderPosition.BEFOREEND);
      this._prevPopupComponent = this._popupComponent;
    } else {
      remove(this._prevPopupComponent);
      render(this._popupContainerElement, this._popupComponent, RenderPosition.BEFOREEND);
      this._prevPopupComponent = this._popupComponent;
    }
  }

  _handlePopupCloseClick() {
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
    }
  }
}
