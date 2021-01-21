import PopupFeaturesView from "../view/popup/popup-features-view";

import dayjs from "dayjs";

import {
  remove,
  render,
  RenderPosition,
  replace
} from "../utils/render-utils";

import {
  UpdateTypeForRerender,
  UserActionForModel
} from "../utils/consts";


export default class PopupFeaturesPresenter {
  constructor(containerElement, handleChangeData) {
    this._containerElement = containerElement;
    this._handleChangeData = handleChangeData;

    this._component = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchList = this._handleWatchList.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFeaturesComponent = this._component;

    this._component = new PopupFeaturesView(this._film);

    this._component.setFavoriteClickHandler(this._handleFavoriteClick);
    this._component.setWatchedClickHandler(this._handleWatchedClick);
    this._component.setWatchlistClickHandler(this._handleWatchList);

    if (prevFeaturesComponent === null) {
      render(this._containerElement, this._component, RenderPosition.BEFOREEND);
      return;
    }

    if (this._containerElement.contains(prevFeaturesComponent.getElement())) {
      replace(this._component, prevFeaturesComponent);
    }

    remove(prevFeaturesComponent);
  }

  destroy() {
    remove(this._component);
  }

  _handleFeaturesClick(updatedData) {
    const newData = Object.assign({}, this._film, updatedData);
    this._handleChangeData(
        UserActionForModel.UPDATE_ITEM,
        UpdateTypeForRerender.MINOR,
        newData
    );
    this.init(newData, true);
  }

  _handleFavoriteClick() {
    this._handleFeaturesClick({isFavorite: !this._film.isFavorite});
  }

  _handleWatchedClick() {
    this._handleFeaturesClick({
      isWatched: !this._film.isWatched,
      watchingDate: dayjs().toISOString()
    });
  }

  _handleWatchList() {
    this._handleFeaturesClick({isInWatchlist: !this._film.isInWatchlist});
  }
}
