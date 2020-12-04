import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
import ShowMoreView from "../view/show-more-view";

import {
  render,
  renderFilmCard,
  RenderPosition
} from "../utils/render-utils";

import {remove} from "../utils/utils";

const FILMS_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector(`.main`);

export default class BoardPresenter {
  constructor(boardContainer, films) {
    this._boardContainer = boardContainer;
    this._films = films;

    this._filmsBoardComponent = new FilmsBoardView();
    this._filmListContainer = this._filmsBoardComponent.getFilmListContainerComponent();

    this._sortComponent = new SortMenuView();
    this._noFilmsComponent = new NoFilmsView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init() {

    // render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    // render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(film) {
    renderFilmCard(this._filmListContainer, film);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmList() {
    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    render(this._filmsBoardComponent.get, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    let renderedFilmCount = FILMS_COUNT_PER_STEP;

    const showMoreButton = new ShowMoreView();

    render(this._filmListContainer, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      this._films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => this._renderFilmCard(film));

      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= this._films.length) {
        remove(showMoreButton);
      }
    });
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilmList();
  }
}
