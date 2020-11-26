import UserProfileView from "./view/user-profile-view";
import MainNavigationView from "./view/main-navigation-view";

import SortMenuView from "./view/sort-menu-view";
import FilmsView from "./view/films-view";
import ShowMoreView from "./view/show-more-view";

// import PopupView from "./view/popup-view";

import FilmCardView from "./view/film-card-view";

import {generateFilm} from "./mock/film";
import {calculateFilmsInFilter} from "./mock/filter";
import FooterStatisticsView from "./view/footer-statistics-view";

import {
  render,
  RenderPosition,
} from "./utils/render-utils";

const FILMS_COUNT = 7;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = calculateFilmsInFilter(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);

// render(document.body, new PopupView(films[0]).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);

render(footer, new FooterStatisticsView(films.length).getElement(), RenderPosition.BEFOREEND);

const filmList = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

for (let i = 1; i < Math.min(films.length, FILMS_COUNT_PER_STEP + 1); i++) {
  render(filmListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP + 1;

  render(filmList, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}
