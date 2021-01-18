import FilmsModel from "./model/films-model";
import FooterStatisticsView from "./view/footer-statistics-view";
import BoardPresenter from "./presenter/board-presenter";
import UserProfilePresenter from "./presenter/user-profile-presenter";
import FilterModel from "./model/filter-model";
import FilterPresenter from "./presenter/filter-presenter";
import Api from "./api/api";

import {
  render,
  RenderPosition,
} from "./utils/render-utils";

import Store from "./api/store";
import Provider from "./api/provider";

import {UpdateTypeForRerender} from "./utils/consts";

const AUTHORIZATION = `Basic hasdfTYtkjfmvGKj`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel, apiWithProvider);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement);

filterPresenter.init();
boardPresenter.init();

apiWithProvider.getFilms()
  .then((movies) => {
    filmsModel.setItems(UpdateTypeForRerender.INIT, movies);
    userProfilePresenter.init(filmsModel.getItems());
    render(footer, new FooterStatisticsView(filmsModel.getItems().length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setItems(UpdateTypeForRerender.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
