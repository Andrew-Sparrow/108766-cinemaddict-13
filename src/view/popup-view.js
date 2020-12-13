import Smart from "./smart";

import {getCommentsTemplate} from "./comments-view";
import {formatReleaseDate, remove} from "../utils/utils";

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

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        ${getCommentsTemplate(comments)}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupView extends Smart {
  constructor(film) {
    super();
    this._film = film;
    this._imageElement = document.createElement(`img`);

    this._popupCloseHandler = this._popupCloseHandler.bind(this);

    this._emotionClickHandler = this._emotionClickHandler.bind(this);

    this._isFavoriteToggleHandler = this._isFavoriteToggleHandler.bind(this);
    this._isInWatchListToggleHandler = this._isInWatchListToggleHandler.bind(this);
    this._isWatchedToggleHandler = this._isWatchedToggleHandler.bind(this);

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._chosenEmotionContainer = this.getElement(`.film-details__add-emoji-label`);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupCloseClick();
  }

  _emotionClickHandler(evt) {
    evt.preventDefault();

    if (this._chosenEmotionContainer.contains(this._imageElement)) {
      this._imageElement.src = evt.target.getAttribute(`src`);
    } else {
      this._imageElement.width = 55;
      this._imageElement.height = 55;
      this._chosenEmotionContainer.appendChild(this._imageElement);
      this._imageElement.src = evt.target.getAttribute(`src`);
    }

    this.updateData(); // TODO
  }

  _isFavoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._film.isFavorite
    });
  }

  _isInWatchListToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isInWatchlist: !this._film.isInWatchlist
    });
  }

  _isWatchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._film.isWatched
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(); // TODO
  }

  _commentInputHandler(evt) {
    // evt.preventDefault();
    // this.updateData({
    //   description: evt.target.value
    // }, true); TODO
    // console.log(evt.target.value);
  }

  _setInnerHandlers() {
    this.getElement(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emotionClickHandler);

    this.getElement(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._isFavoriteToggleHandler);

    this.getElement(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._isInWatchListToggleHandler);

    this.getElement(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._isWatchedToggleHandler);

    this.getElement(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  reset(film) {
    this.updateData(
      // TaskEdit.parseTaskToData(film)
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseHandler);
  }
}
