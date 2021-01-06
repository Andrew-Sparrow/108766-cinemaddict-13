import StatisticsView from "../view/statistics-view";

import {
  remove,
  render,
  RenderPosition
} from "../utils/render-utils";

import StatisticsInfoView from "../view/statistics-info-view";
import StatisticsDiagramView from "../view/statistics-diagram-view";

import {getWatchedFilms} from "../utils/statistics-utils";
import {StatisticsMenuItem} from "../utils/consts";

export default class StatisticsPresenter {
  constructor(statisticsContainer) {
    this._statisticsContainer = statisticsContainer;

    this._handleTimePeriodClick = this._handleTimePeriodClick.bind(this);
  }

  init(films) {
    this._films = films;

    const watchedFilms = getWatchedFilms(this._films);

    this._statisticsComponent = new StatisticsView(watchedFilms);
    this._statisticsInfoView = new StatisticsInfoView(watchedFilms);
    this._statisticsDiagramView = new StatisticsDiagramView(watchedFilms);

    this._statisticsComponent.setTimePeriodClickHandler(this._handleTimePeriodClick);

    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
    render(this._statisticsComponent, this._statisticsInfoView, RenderPosition.BEFOREEND);
    render(this._statisticsComponent, this._statisticsDiagramView, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._statisticsComponent);
    remove(this._statisticsInfoView);
    remove(this._statisticsDiagramView);
  }

  _handleTimePeriodClick(menuItemValue) {
    switch (menuItemValue) {
      case StatisticsMenuItem.ALL:
        console.log(`ALL`);
        break;
      case StatisticsMenuItem.TODAY:
        console.log(`TODAY`);
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
