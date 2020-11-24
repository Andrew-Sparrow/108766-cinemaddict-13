import {createUserProfileTemplate} from "./view/user-profile-view";
import {createMainNavigationTemplate} from "./view/main-navigation-view";
import {createSortMenuTemplate} from "./view/sort-menu-view";
import {createFilmsTemplate} from "./view/films-view";
import {createShowMoreTemplate} from "./view/show-more-view";
import {createPopupTemplate} from "./view/popup";
import {createFilmCardTemplate} from "./view/film-card-view";
import {generateFilm} from "./mock/film";

import {
  RenderPosition,
  render
} from "./utils/render-utils";

const FILMS_COUNT = 7;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserProfileTemplate(), RenderPosition.BEFOREEND);
render(siteMainElement, createMainNavigationTemplate(), RenderPosition.BEFOREEND);
render(siteMainElement, createSortMenuTemplate(), RenderPosition.BEFOREEND);

render(siteMainElement, createPopupTemplate(films[0]), RenderPosition.BEFOREEND);

render(siteMainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const filmList = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

render(filmList, createShowMoreTemplate(), RenderPosition.BEFOREEND);

for (let i = 1; i < FILMS_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(films[i]), RenderPosition.BEFOREEND);
}
