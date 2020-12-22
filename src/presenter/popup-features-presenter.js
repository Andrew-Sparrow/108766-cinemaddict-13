import PopupFeaturesView from "../view/popup-features-view";
import {remove} from "../utils/utils";
import {render, RenderPosition} from "../utils/render-utils";

export default class PopupFeaturesPresenter {
  constructor(popupFeaturesContainerElement, handleChangeData) {
    this._popupFeaturesContainerElement = popupFeaturesContainerElement;
    this._handleChangeData = handleChangeData;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchList = this._handleWatchList.bind(this);
  }

  init(film) {
    this._film = film;
    this._popupFeaturesComponent = new PopupFeaturesView(this._film);

    this._popupFeaturesComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupFeaturesComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupFeaturesComponent.setWatchlistClickHandler(this._handleWatchList);

    render(this._popupFeaturesContainerElement, this._popupFeaturesComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._popupFeaturesComponent);
  }

  _handleFeaturesClick(updatedData) {
    const newData = Object.assign({}, this._film, updatedData);
    this._handleChangeData(newData);
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
