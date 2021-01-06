import StatisticsView from "../view/statistics-view";

import {
  remove,
  render,
  RenderPosition
} from "../utils/render-utils";

import StatisticsInfoView from "../view/statistics-info-view";
import StatisticsDiagramView from "../view/statistics-diagram-view";

import {
  getWatchedFilms,
  getTodayWatchedFilms
} from "../utils/statistics-utils";

import {StatisticsMenuItem} from "../utils/consts";

export default class StatisticsPresenter {
  constructor(statisticsContainer) {
    this._statisticsContainer = statisticsContainer;

    this._handleTimePeriodClick = this._handleTimePeriodClick.bind(this);
  }

  init(films) {
    this._films = films;

    this._watchedFilms = getWatchedFilms(this._films);

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
    render(this._statisticsComponent, this._statisticsDiagramView, RenderPosition.BEFOREEND);
  }

  _handleTimePeriodClick(menuItemValue) {
    switch (menuItemValue) {
      case StatisticsMenuItem.ALL:
        this._removeInfoStatistics();
        this._renderInfoStatistics(this._watchedFilms);
        break;
      case StatisticsMenuItem.TODAY:
        this._removeInfoStatistics();
        this._renderInfoStatistics(getTodayWatchedFilms(this._watchedFilms));
        break;
      case StatisticsMenuItem.WEEK:
        console.log(`WEEK`);
        break;
      case StatisticsMenuItem.YEAR:
        console.log(`YEAR`);
        break;
    }
  }
}
