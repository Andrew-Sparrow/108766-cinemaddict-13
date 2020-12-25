import FilmCardView from "../view/film-card-view";

import {
  render,
  replace,
  remove,
  RenderPosition,
} from "../utils/render-utils";

import {
  UpdateTypeForRerender
} from "../utils/consts";

export default class FilmCardPresenter {
  constructor(filmListContainerElement, handleChangeData, popupPresenter) {

    this._filmListContainerElement = filmListContainerElement;
    this._handleChangeData = handleChangeData;
    this._popupPresenter = popupPresenter;

    this._filmCardComponent = null;

    this._handlePopupOpen = this._handlePopupOpen.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setCardPosterClickHandler(this._handlePopupOpen);
    this._filmCardComponent.setCardTitleClickHandler(this._handlePopupOpen);
    this._filmCardComponent.setCardCommentsClickHandler(this._handlePopupOpen);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmCardComponent === null) {
      render(this._filmListContainerElement, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainerElement.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _handlePopupOpen() {
    document.body.classList.add(`hide-overflow`);
    this._popupPresenter.init(this._film);
  }

  _handleFavoriteClick() {
    const newData = Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite
        }
    );

    this._handleChangeData(
        UpdateTypeForRerender.MINOR,
        newData
    );
  }

  _handleWatchlistClick() {
    const newData = Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist
        }
    );

    this._handleChangeData(
        UpdateTypeForRerender.MINOR,
        newData
    );
  }

  _handleWatchedClick() {
    const newData = Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched
        }
    );

    this._handleChangeData(
        UpdateTypeForRerender.MINOR,
        newData
    );
  }
}
