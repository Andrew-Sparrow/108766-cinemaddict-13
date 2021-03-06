import FilmCardView from "../view/films/film-card-view";
import dayjs from "dayjs";

import {
  render,
  replace,
  remove,
  RenderPosition,
} from "../utils/render-utils";

import {
  UpdateTypeForRerender,
  UserActionForModel
} from "../utils/consts";


export default class FilmCardPresenter {
  constructor(filmListContainerElement, handleChangeData, popupPresenter) {

    this._filmListContainerElement = filmListContainerElement;
    this._handleChangeData = handleChangeData;
    this._popupPresenter = popupPresenter;

    this._component = null;

    this._handlePopupOpen = this._handlePopupOpen.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._component;

    this._component = new FilmCardView(film);

    this._component.setPosterClickHandler(this._handlePopupOpen);
    this._component.setTitleClickHandler(this._handlePopupOpen);
    this._component.setCommentsClickHandler(this._handlePopupOpen);

    this._component.setFavoriteClickHandler(this._handleFavoriteClick);
    this._component.setWatchlistClickHandler(this._handleWatchlistClick);
    this._component.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmCardComponent === null) {
      render(this._filmListContainerElement, this._component, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainerElement.contains(prevFilmCardComponent.getElement())) {
      replace(this._component, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._component);
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
        UserActionForModel.UPDATE_ITEM,
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
        UserActionForModel.UPDATE_ITEM,
        UpdateTypeForRerender.MINOR,
        newData
    );
  }

  _handleWatchedClick() {
    const newData = Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
          watchingDate: dayjs().toISOString()
        }
    );

    this._handleChangeData(
        UserActionForModel.UPDATE_ITEM,
        UpdateTypeForRerender.MINOR,
        newData
    );
  }
}
