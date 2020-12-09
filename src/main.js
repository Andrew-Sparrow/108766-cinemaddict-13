import UserProfileView from "./view/user-profile-view";
import MainNavigationView from "./view/main-navigation-view";
import FooterStatisticsView from "./view/footer-statistics-view";
import BoardPresenter from "./presenter/board-presenter";

import {generateFilm} from "./mock/film";
import {calculateFilmsInFilter} from "./mock/filter";

import {
  render,
  RenderPosition,
} from "./utils/render-utils";

const FILMS_COUNT = 8;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
// console.log(films);
const filters = calculateFilmsInFilter(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const boardPresenter = new BoardPresenter(siteMainElement, films);

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);

render(footer, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);

boardPresenter.init();
