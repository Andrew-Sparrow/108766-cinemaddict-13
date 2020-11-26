import UserProfileView from "./view/user-profile-view";
import MainNavigation from "./view/main-navigation-view";

import SortMenu from "./view/sort-menu-view";
import Films from "./view/films-view";
import {createShowMoreTemplate} from "./view/show-more-view";

// import {createPopupTemplate} from "./view/popup-view";

import {createFilmCardTemplate} from "./view/film-card-view";
import {generateFilm} from "./mock/film";
import {calculateFilmsInFilter} from "./mock/filter";
import {createFooterStatisticsTemplate} from "./view/footer-statistics-view";

import {
  renderElement,
  renderTemplate,
  RenderPosition,
} from "./utils/render-utils";

const FILMS_COUNT = 7;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = calculateFilmsInFilter(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

renderElement(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MainNavigation().getElement(filters), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new SortMenu().getElement(), RenderPosition.BEFOREEND);

// renderTemplate(document.body, createPopupTemplate(films[0]), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new Films().getElement(), RenderPosition.BEFOREEND);

renderTemplate(footer, createFooterStatisticsTemplate(films.length), RenderPosition.BEFOREEND);
const filmList = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

for (let i = 1; i < Math.min(films.length, FILMS_COUNT_PER_STEP + 1); i++) {
  renderTemplate(filmListContainer, createFilmCardTemplate(films[i]), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP + 1;

  renderTemplate(filmList, createShowMoreTemplate(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmListContainer, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}
