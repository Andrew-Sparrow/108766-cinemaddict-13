import Smart from "../smart";

const getPopupFeatures = (film) => {
  const {
    isInWatchlist,
    isWatched,
    isFavorite
  } = film;

  return `<section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"  ${isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>`;
};

export default class PopupFeaturesView extends Smart {
  constructor(film) {
    super();
    this._film = film;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return getPopupFeatures(this._film);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favorite();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watched();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlist();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favorite = callback;
    this.getElement(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watched = callback;
    this.getElement(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlist = callback;
    this.getElement(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }
}
