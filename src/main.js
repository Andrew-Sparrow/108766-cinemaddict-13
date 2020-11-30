import UserProfileView from "./view/user-profile-view";
import MainNavigationView from "./view/main-navigation-view";

import SortMenuView from "./view/sort-menu-view";
import FilmsView from "./view/films-board-view";
import ShowMoreView from "./view/show-more-view";

import {generateFilm} from "./mock/film";
import {calculateFilmsInFilter} from "./mock/filter";
import FooterStatisticsView from "./view/footer-statistics-view";
import NoFilmsView from "./view/no-films";

import {
  render,
  RenderPosition,
  renderFilmCard
} from "./utils/render-utils";

import {remove} from "./utils/utils";

const FILMS_COUNT = 8;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = calculateFilmsInFilter(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);


render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();

render(footer, new FooterStatisticsView(films.length).getElement(), RenderPosition.BEFOREEND);

const filmList = filmsComponent.getElement(`.films-list`);
const filmListContainer = filmsComponent.getElement(`.films-list__container`);


if (films.length === 0) {

  render(filmList, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);

} else {
  render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 1; i < Math.min(films.length, FILMS_COUNT_PER_STEP + 1); i++) {
    renderFilmCard(filmListContainer, films[i]);
  }

  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmCount = FILMS_COUNT_PER_STEP + 1;

    const showMoreButton = new ShowMoreView();

    render(filmList, showMoreButton.getElement(), RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((film, index) => renderFilmCard(filmListContainer, films[index]));

      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        remove(showMoreButton);
      }
    });
  }
}
