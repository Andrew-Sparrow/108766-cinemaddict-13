import Smart from "./smart";

// import {getCommentsTemplate} from "./comments-view";
import {formatReleaseDate} from "../utils/utils";

const getFilmGenresTemplate = (film) => {
  const {genres} = film;
  const listOfGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);

  return `<td class="film-details__cell">
            ${listOfGenres}
          </td>`;
};

const getFilmDetailsTemplate = (film) => {
  const {
    director,
    screenwriters,
    actors,
    releaseDate,
    duration,
    country,
  } = film;

  const writers = screenwriters.join(`, `);
  const filmActors = actors.join(`, `);

  return `<table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatReleaseDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              ${getFilmGenresTemplate(film)}
            </tr>
          </table>`;
};

const createPopupTemplate = (film) => {
  const {
    poster,
    title,
    originalTitle,
    rating,
    description,
    ageRating,
    comments
  } = film;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster.src} alt="${poster.description}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          ${getFilmDetailsTemplate(film)}
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupView extends Smart {
  constructor(film) {
    super();
    this._film = film;

    this._popupCloseHandler = this._popupCloseHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  getCommentsTitleElement() {
    return this.getElement(`.film-details__comments-title`);
  }

  getCommentsWrapElement() {
    return this.getElement(`.film-details__comments-wrap`);
  }

  getFeaturesContainerElement() {
    return this.getElement(`.film-details__top-container`);
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupCloseClick();
  }

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement(`.film-details__close-btn`)
     .addEventListener(`click`, this._popupCloseHandler);
  }
}
