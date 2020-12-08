import FilmCardView from "../view/film-card-view";

import {
  render,
  renderPopup,
  RenderPosition
} from "../utils/render-utils";

export default class FilmCardPresenter {
  constructor(filmListContainerElement) {
    this._filmListContainerElement = filmListContainerElement;
    this._filmCardComponent = null;
    this._handlePopupOpen = this._handlePopupOpen.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setCardPosterClickHandler(this._handlePopupOpen);
    this._filmCardComponent.setCardTitleClickHandler(this._handlePopupOpen);
    this._filmCardComponent.setCardCommentsClickHandler(this._handlePopupOpen);

    render(this._filmListContainerElement, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _handlePopupOpen() {
    document.body.classList.add(`hide-overflow`);
    renderPopup(this._film);
  }
}
