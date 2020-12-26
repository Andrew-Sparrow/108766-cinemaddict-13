import FilmsModel from "./model/films-model";
import UserProfileView from "./view/user-profile-view";
import FiltersView from "./view/filters-view";
import FooterStatisticsView from "./view/footer-statistics-view";
import BoardPresenter from "./presenter/board-presenter";
import FilterModel from "./model/filter-model";
import FilterPresenter from "./presenter/filter-presenter";

import {generateFilm} from "./mock/film";

import {
  render,
  RenderPosition,
} from "./utils/render-utils";
import {calculateFilmsInFilter} from "./utils/filter-utils";

const FILMS_COUNT = 8;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const calculatedFilters = calculateFilmsInFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setItems(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new FiltersView(calculatedFilters), RenderPosition.BEFOREEND);

render(footer, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();
