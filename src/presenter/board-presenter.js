import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
import ShowMoreView from "../view/show-more-view";
import FilmsListView from "../view/films-list-view";

import {SortType} from "../utils/consts";

import {
  render,
  renderFilmCard,
  RenderPosition
} from "../utils/render-utils";

import {
  remove,
  sortByDate,
  sortByRating,
  sortByComments,
  getMostValuedFilms
} from "../utils/utils";

const FILMS_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  constructor(boardContainer, films) {
    this._boardContainer = boardContainer;

    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsBoardComponent = new FilmsBoardView();
    this._filmListComponent = new FilmsListView();
    this._filmListContainerComponent = this._filmListComponent.getFilmListContainerComponent();

    this._showMoreButtonComponent = new ShowMoreView();

    this._sortComponent = new SortMenuView();
    this._noFilmsComponent = new NoFilmsView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }


  init() {
    this._renderBoard();
    render(this._boardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCardInBasicList(film) {
    renderFilmCard(this._filmListContainerComponent, film);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCardInBasicList(film));
  }

  _renderFilmList() {
    render(this._filmsBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);

    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _clearFilmList() {
    this._filmListContainerComponent.innerHTML = ``;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderExtraTop(title, sortByCallback) {
    const mostRatedFilms = getMostValuedFilms(this._films, sortByCallback);

    if (mostRatedFilms.length !== 0 && parseInt(mostRatedFilms[0].rating, 10) !== 0) {
      const filmListComponent = new FilmsListView();
      const filmListTitleComponent = filmListComponent.getFilmListTitleComponent();
      const filmListContainerComponent = filmListComponent.getFilmListContainerComponent();

      render(this._filmsBoardComponent, filmListComponent, RenderPosition.BEFOREEND);

      filmListTitleComponent.classList.remove(`visually-hidden`);
      filmListComponent.getElement().classList.add(`films-list--extra`);
      filmListTitleComponent.innerHTML = title;

      for (let film of mostRatedFilms) {
        renderFilmCard(filmListContainerComponent, film);
      }
    }
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilmList();
    this._renderExtraTop(`Top rated`, sortByRating);
    this._renderExtraTop(`Most commented`, sortByComments);
  }
}
