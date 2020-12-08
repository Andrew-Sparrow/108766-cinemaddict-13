import FilmCardView from "../view/film-card-view";

import {
  render,
  renderPopup,
  replace,
  RenderPosition
} from "../utils/render-utils";

import {remove} from "../utils/utils";

export default class FilmCardPresenter {
  constructor(filmListContainerElement) {
    this._filmListContainerElement = filmListContainerElement;

    this._filmCardComponent = null;

    this._handlePopupOpen = this._handlePopupOpen.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setCardPosterClickHandler(this._handlePopupOpen);
    this._filmCardComponent.setCardTitleClickHandler(this._handlePopupOpen);
    this._filmCardComponent.setCardCommentsClickHandler(this._handlePopupOpen);

    if (prevFilmCardComponent === null) {
      render(this._filmListContainerElement, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainerElement.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _handlePopupOpen() {
    document.body.classList.add(`hide-overflow`);
    renderPopup(this._film);
  }
}
