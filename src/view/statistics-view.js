import Smart from "./smart";
import dayjs from "dayjs";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  countWatchedFilmsInDateRange,
  countFilmsByGenres,
  getTopGenre
} from "../utils/statistics-utils";

import {
  getUserRank,
  getTimePropertiesOfTotalFilmsDuration,
  getTotalFilmDuration,
  getWatchedFilms
} from "../utils/common-utils";

import {USER_RANKS} from "../utils/consts";

const renderFilmsChart = (filmsCtx, watchedFilms, dateFrom, dateTo) => {

  const BAR_HEIGHT = 50;

  const propertiesWatchedFilmGenres = countFilmsByGenres(watchedFilms);

  const watchedGenres = Object.keys(propertiesWatchedFilmGenres);

  const countedWatchedGenres = Object.values(propertiesWatchedFilmGenres);

  filmsCtx.height = BAR_HEIGHT * 5;

  // Функция для отрисовки графика по цветам
  return new Chart(filmsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: watchedGenres,
      datasets: [{
        data: countedWatchedGenres,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = (data, propertiesTotalFilmsDuration, topGenre) => {
  const {
    watchedFilms,
    dateFrom,
    dateTo
  } = data;

  const {
    hours,
    minutes
  } = propertiesTotalFilmsDuration;

  // const watchedFilmsInDateRange = countWatchedFilmsInDateRange(films, dateFrom, dateTo);

  const userRank = getUserRank(watchedFilms);

  const amountOfWatchedFilms = watchedFilms.length;

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      ${userRank === USER_RANKS.NO_RANK ? `` : `<span class="statistic__rank-label">${userRank}</span>`}
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

    <ul class="statistic__text-list">
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
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class StatisticsView extends Smart {
  constructor(films) {
    super();
    const watchedFilms = getWatchedFilms(films);

    this._data = {
      watchedFilms,
      dateFrom: dayjs().toDate(),
      dateTo: (() => {
        const daysToFullWeek = 15;
        return dayjs().add(daysToFullWeek, `day`).toDate();
      })()
    };

    this._filmsChart = null;

    this._totalFilmsDuration = getTotalFilmDuration(this._data.watchedFilms);
    this._propertiesFilmDuration = getTimePropertiesOfTotalFilmsDuration(this._totalFilmsDuration);

    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(
        this._data,
        this._propertiesFilmDuration,
        this._getTopGenre()
    );
  }

  restoreHandlers() {
    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._filmsChart !== null) {
      this._filmsChart = null;
    }
  }

  _getTopGenre() {
    return getTopGenre(countFilmsByGenres(this._data.watchedFilms));
  }

  _dateChangeHandler([dateFrom, dateTo]) {
    if (!dateFrom || !dateTo) {
      return;
    }

    this.updateData({
      dateFrom,
      dateTo
    });
  }

  _setCharts() {
    if (this._filmsChart !== null) {
      this._filmsChart = null;
    }

    const {
      watchedFilms,
      dateFrom,
      dateTo
    } = this._data;

    const filmsCtx = this.getElement().querySelector(`.statistic__chart`);

    this._filmsChart = renderFilmsChart(filmsCtx, watchedFilms, dateFrom, dateTo);
  }
}
