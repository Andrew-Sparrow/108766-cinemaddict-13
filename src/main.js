import FilmsModel from "./model/films-model";
import FooterStatisticsView from "./view/footer-statistics-view";
import BoardPresenter from "./presenter/board-presenter";
import UserProfilePresenter from "./presenter/user-profile-presenter";
import FilterModel from "./model/filter-model";
import FilterPresenter from "./presenter/filter-presenter";
import Api from "./api";

import {generateFilm} from "./mock/film";

import {
  render,
  RenderPosition,
} from "./utils/render-utils";

const FILMS_COUNT = 13;
const AUTHORIZATION = `Basic hasdfTYtkjfmvGKj`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms()
  .then((movies) => {
    console.log(movies);
  });

const filmsModel = new FilmsModel();
filmsModel.setItems(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement);

userProfilePresenter.init(filmsModel.getItems());

render(footer, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();
