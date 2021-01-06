import StatisticsView from "../view/statistics/statistics-view";

import {
  remove,
  render,
  RenderPosition
} from "../utils/render-utils";

import StatisticsInfoView from "../view/statistics/statistics-info-view";
import StatisticsDiagramView from "../view/statistics/statistics-diagram-view";

import {
  getWatchedFilms,
  getTodayWatchedFilms,
  getWatchedFilmsInDateRange
} from "../utils/statistics-utils";

import {
  StatisticsMenuItem,
  StatisticsAmountDays
} from "../utils/consts";

export default class StatisticsPresenter {
  constructor(statisticsContainer) {
    this._statisticsContainer = statisticsContainer;

    this._handleTimePeriodClick = this._handleTimePeriodClick.bind(this);
  }

  init(films) {
    this._films = films;

    this._watchedFilms = getWatchedFilms(this._films);
    this._weekWatchedFilms = null;
    this._monthWatchedFilms = null;
    this._yearWatchedFilms = null;

    this._statisticsComponent = new StatisticsView(this._watchedFilms);
    this._statisticsInfoView = null;
    this._statisticsDiagramView = null;

    this._statisticsComponent.setTimePeriodClickHandler(this._handleTimePeriodClick);

    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._renderInfoStatistics(this._watchedFilms);

  }

  destroy() {
    remove(this._statisticsComponent);
    remove(this._statisticsInfoView);
    remove(this._statisticsDiagramView);
  }

  _removeInfoStatistics() {
    remove(this._statisticsInfoView);
    remove(this._statisticsDiagramView);
  }

  _renderInfoStatistics(filteredWatchedFilms) {
    this._statisticsInfoView = new StatisticsInfoView(filteredWatchedFilms);
    this._statisticsDiagramView = new StatisticsDiagramView(filteredWatchedFilms);

    render(this._statisticsComponent, this._statisticsInfoView, RenderPosition.BEFOREEND);

    if (filteredWatchedFilms.length !== 0) {
      render(this._statisticsComponent, this._statisticsDiagramView, RenderPosition.BEFOREEND);
    }
  }

  _handleTimePeriodClick(menuItemValue) {
    switch (menuItemValue) {
      case StatisticsMenuItem.ALL:
        this._removeInfoStatistics();
        this._renderInfoStatistics(this._watchedFilms);
        break;
      case StatisticsMenuItem.TODAY:
        const todayWatchedFilms = getTodayWatchedFilms(this._watchedFilms);

        this._removeInfoStatistics();
        this._renderInfoStatistics(todayWatchedFilms);
        break;
      case StatisticsMenuItem.WEEK:
        if (this._weekWatchedFilms === null) {
          this._weekWatchedFilms = getWatchedFilmsInDateRange(this._watchedFilms, StatisticsAmountDays.WEEK);
        }

        this._removeInfoStatistics();
        this._renderInfoStatistics(this._weekWatchedFilms);
        break;
      case StatisticsMenuItem.MONTH:
        if (this._monthWatchedFilms === null) {
          this._monthWatchedFilms = getWatchedFilmsInDateRange(this._watchedFilms, StatisticsAmountDays.MONTH);
        }

        this._removeInfoStatistics();
        this._renderInfoStatistics(this._monthWatchedFilms);
        break;
      case StatisticsMenuItem.YEAR:
        if (this._yearWatchedFilms === null) {
          this._yearWatchedFilms = getWatchedFilmsInDateRange(this._watchedFilms, StatisticsAmountDays.YEAR);
        }

        this._removeInfoStatistics();
        this._renderInfoStatistics(this._yearWatchedFilms);
        break;
    }
  }
}
