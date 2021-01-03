import PopupFeaturesView from "../view/popup-features-view";
import {remove, render, RenderPosition, replace} from "../utils/render-utils";
import {UpdateTypeForRerender} from "../utils/consts";

export default class PopupFeaturesPresenter {
  constructor(popupFeaturesContainerElement, handleChangeData) {
    this._popupFeaturesContainerElement = popupFeaturesContainerElement;
    this._handleChangeData = handleChangeData;

    this._featuresComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchList = this._handleWatchList.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFeaturesComponent = this._featuresComponent;

    this._featuresComponent = new PopupFeaturesView(this._film);

    this._featuresComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._featuresComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._featuresComponent.setWatchlistClickHandler(this._handleWatchList);

    if (prevFeaturesComponent === null) {
      render(this._popupFeaturesContainerElement, this._featuresComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._popupFeaturesContainerElement.contains(prevFeaturesComponent.getElement())) {
      replace(this._featuresComponent, prevFeaturesComponent);
    }

    remove(prevFeaturesComponent);
  }

  destroy() {
    remove(this._featuresComponent);
  }

  _handleFeaturesClick(updatedData) {
    const newData = Object.assign({}, this._film, updatedData);
    this._handleChangeData(UpdateTypeForRerender.MINOR, newData);
    this.init(newData, true);
  }

  _handleFavoriteClick() {
    this._handleFeaturesClick({isFavorite: !this._film.isFavorite});
  }

  _handleWatchedClick() {
    this._handleFeaturesClick({isWatched: !this._film.isWatched});
  }

  _handleWatchList() {
    this._handleFeaturesClick({isInWatchlist: !this._film.isInWatchlist});
  }
}
