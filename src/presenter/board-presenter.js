import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
import ShowMoreView from "../view/show-more-view";
import FilmsListView from "../view/films-list-view";
import FilmCardPresenter from "./film-presenter";

import {SortType} from "../utils/consts";

import {
  render,
  updateItem,
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
    this._filmsPresenter = new Map();

    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsBoardComponent = new FilmsBoardView();
    this._filmListComponent = new FilmsListView();
    this._filmListContainerComponent = this._filmListComponent.getFilmListContainerComponent();

    this._showMoreButtonComponent = new ShowMoreView();

    this._sortComponent = new SortMenuView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmListComponentTopRated = null;
    this._filmListComponentMostCommented = null;

    this._mostValuedFilmsByRating = getMostValuedFilms(this._films, sortByRating);
    this._mostValuedFilmsByComments = getMostValuedFilms(this._films, sortByComments);

    this._handleFilmChange = this._handleFilmChange.bind(this);
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

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(filmListContainerComponent, film) {
    const filmCardPresenter = new FilmCardPresenter(filmListContainerComponent, this._handleFilmChange);
    // console.log(filmCardPresenter);
    filmCardPresenter.init(film);
    this._filmsPresenter.set(film.id, filmCardPresenter);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(this._filmListContainerComponent, film));
  }

  _renderBasicFilmList() {
    render(this._filmsBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmsPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);

    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderBasicFilmList();
    // this._clearExtras();
    // this._renderExtras();
  }

  _clearFilmList() {
    this._filmsPresenter.forEach((presenter) => {
      presenter.destroy();
    });
    this._filmsPresenter = new Map();
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderExtraTop(title, mostRatedFilms) {
    const filmListComponent = new FilmsListView();
    const filmListContainerComponent = filmListComponent.getFilmListContainerComponent();

    render(this._filmsBoardComponent, filmListComponent, RenderPosition.BEFOREEND);

    filmListComponent.addClassExtra();

    filmListComponent.addTitleForFilmListBlock(title);

    for (let film of mostRatedFilms) {
      this._renderFilmCard(filmListContainerComponent, film);
    }

    return filmListComponent;
  }

  _renderExtras() {
    if (this._mostValuedFilmsByRating.length !== 0 && parseInt(this._mostValuedFilmsByRating[0].rating, 10) !== 0) {
      this._filmListComponentTopRated = this._renderExtraTop(`Top rated`, this._mostValuedFilmsByRating);
    }

    if (this._mostValuedFilmsByComments.length !== 0 && this._mostValuedFilmsByComments[0].comments.length !== 0) {
      this._filmListComponentMostCommented = this._renderExtraTop(`Most commented`, this._mostValuedFilmsByComments);
    }
  }

  _clearExtras() {
    remove(this._filmListComponentTopRated);
    remove(this._filmListComponentMostCommented);
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderBasicFilmList();
    this._renderExtras();
  }
}
