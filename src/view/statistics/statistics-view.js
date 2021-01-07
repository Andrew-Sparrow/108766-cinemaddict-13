import Smart from "../smart";

import {
  getUserRank
} from "../../utils/common-utils";

import {UserRanks} from "../../utils/consts";
import {getWatchedFilms} from "../../utils/statistics-utils";

const createStatisticsTemplate = (watchedFilms) => {

  // const watchedFilmsInDateRange = countWatchedFilmsInDateRange(films, dateFrom, dateTo);

  const userRank = getUserRank(watchedFilms);

  return `<section class="statistic">
            <p class="statistic__rank">
              Your rank
              <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              ${userRank === UserRanks.NO_RANK ? `` : `<span class="statistic__rank-label">${userRank}</span>`}
            </p>

            <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
              <p class="statistic__filters-description">Show stats:</p>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
              <label for="statistic-all-time" class="statistic__filters-label">All time</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
              <label for="statistic-today" class="statistic__filters-label">Today</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
              <label for="statistic-week" class="statistic__filters-label">Week</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
              <label for="statistic-month" class="statistic__filters-label">Month</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
              <label for="statistic-year" class="statistic__filters-label">Year</label>
            </form>

          </section>`;
};

export default class StatisticsView extends Smart {
  constructor(films) {
    super();
    this._watchedFilms = getWatchedFilms(films);

    this._timePeriodClickHandler = this._timePeriodClickHandler.bind(this);
  }

  getTemplate() {
    return createStatisticsTemplate(this._watchedFilms);
  }

  _timePeriodClickHandler(evt) {
    evt.preventDefault();
    this._callback.timePeriodClick(evt.target.id);
  }

  setTimePeriodClickHandler(callback) {
    this._callback.timePeriodClick = callback;
    this.getElement(`.statistic__filters`).addEventListener(`change`, this._timePeriodClickHandler);
  }
}
