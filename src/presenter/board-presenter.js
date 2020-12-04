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

export default class BoardPresenter {
  constructor(boardContainer, films) {
    this._boardContainer = boardContainer;
    this._films = films;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsComponent = new FilmsBoardView();
    this._filmList = this._filmsComponent.getFilmListComponent();
    this._filmListContainer = this._filmsComponent.getFilmListContainerComponent();
    this._showMoreButtonComponent = new ShowMoreView();

    this._sortComponent = new SortMenuView();
    this._noFilmsComponent = new NoFilmsView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderBoard();
    render(this._boardContainer, this._filmsComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    render(this._filmList, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);

    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
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
