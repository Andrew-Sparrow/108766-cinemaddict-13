import {userProfileView} from "./view/user-profile-view";
import {mainNavigationView} from "./view/main-navigation-view";
import {sortMenuView} from "./view/sort-menu-view";
import {filmsView} from "./view/films-view";
import {showMoreView} from "./view/show-more-view";
import {filmCardView} from "./view/film-card";

import {
  RenderPosition,
  render
} from "./utils/render-utils";

const MOVIE_COUNT = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, userProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, mainNavigationView(), RenderPosition.BEFOREEND);
render(siteMainElement, sortMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsView(), RenderPosition.BEFOREEND);

const filmList = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

render(filmList, showMoreView(), RenderPosition.BEFOREEND);

for (let i = 0; i < MOVIE_COUNT; i++) {
  render(filmListContainer, filmCardView(), RenderPosition.BEFOREEND);
}
