import {truncateText} from "../utils/common-utils";

export const createFilmCardTemplate = (film) => {
  const {
    poster,
    title,
    rating,
    releaseDate,
    duration,
    genres,
    description,
    commentsID,
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
          <a class="film-card__comments">${commentsID.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};