import UserProfileView from "./view/user-profile-view";
import MainNavigationView from "./view/main-navigation-view";

import SortMenuView from "./view/sort-menu-view";
import FilmsView from "./view/films-view";
import ShowMoreView from "./view/show-more-view";

import PopupView from "./view/popup-view";

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

const renderFilmCard = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderPopup = (film) => {
  const popupComponent = new PopupView(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      document.body.removeChild(popupComponent.getElement());
      popupComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(popupComponent.getElement());
    popupComponent.removeElement();
  });

  // как лучше сделать отрисовку popup'a, так
  render(document.body, popupComponent.getElement(), RenderPosition.BEFOREEND);
  // или так ?
  // document.body.appendChild(popupComponent.getElement());
};

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();

render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

render(footer, new FooterStatisticsView(films.length).getElement(), RenderPosition.BEFOREEND);

const filmList = filmsComponent.getElement().querySelector(`.films-list`);
const filmListContainer = filmsComponent.getElement().querySelector(`.films-list__container`);

for (let i = 1; i < Math.min(films.length, FILMS_COUNT_PER_STEP + 1); i++) {
  renderFilmCard(filmListContainer, films[i]);
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
