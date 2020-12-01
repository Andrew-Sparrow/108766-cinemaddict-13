import Abstract from "./abstract";
import {truncateText} from "../utils/common-utils";

const createFilmCardTemplate = (film) => {
  const {
    poster,
    title,
    rating,
    releaseDate,
    duration,
    genres,
    description,
    comments,
    isFavorite,
    isInWatchlist,
    isWatched
  } = film;

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate.getFullYear()}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster.src}" alt="${poster.description}" class="film-card__poster">
          <p class="film-card__description">${truncateText(description)}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setCardPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }

  setCardTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  setCardCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement(`.film-card__comments`).addEventListener(`click`, this._commentsClickHandler);
  }
}
