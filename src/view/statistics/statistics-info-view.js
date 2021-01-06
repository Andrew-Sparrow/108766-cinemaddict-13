import Smart from "../smart";

import {
  countFilmsByGenres,
  getTopGenre, getWatchedFilms,
} from "../../utils/statistics-utils";

import {
  getTimePropertiesOfTotalFilmsDuration,
  getTotalFilmDuration
} from "../../utils/common-utils";

const createStatisticsInfoTemplate = (watchedFilms, propertiesTotalFilmsDuration, topGenre) => {
  const amountOfWatchedFilms = watchedFilms.length;

  const {
    hours,
    minutes
  } = propertiesTotalFilmsDuration;

  return `<ul class="statistic__text-list">
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">You watched</h4>
              <p class="statistic__item-text">${amountOfWatchedFilms} <span class="statistic__item-description">movies</span></p>
            </li>
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">Total duration</h4>
              <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
            </li>
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">Top genre</h4>
              <p class="statistic__item-text">${topGenre}</p>
            </li>
          </ul>`;
};

export default class StatisticsInfoView extends Smart {
  constructor(films) {
    super();
    const watchedFilms = getWatchedFilms(films);

    this._data = {
      watchedFilms
    };

    this._totalFilmsDuration = getTotalFilmDuration(this._data.watchedFilms);
    this._propertiesFilmDuration = getTimePropertiesOfTotalFilmsDuration(this._totalFilmsDuration);
  }

  getTemplate() {
    return createStatisticsInfoTemplate(
        this._data.watchedFilms,
        this._propertiesFilmDuration,
        this._getTopGenre()
    );
  }

  _getTopGenre() {
    return getTopGenre(countFilmsByGenres(this._data.watchedFilms));
  }
}
