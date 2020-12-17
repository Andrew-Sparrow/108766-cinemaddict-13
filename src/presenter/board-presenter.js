import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
import ShowMoreView from "../view/show-more-view";
import FilmsListView from "../view/films-list-view";
import FilmCardPresenter from "./film-presenter";
import PopupPresenter from "./popup-presenter";

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

    this._listRenderedPresentersInBasicBlock = new Map();
    this._listRenderedPresentersInTopRatedBlock = new Map();
    this._listRenderedPresentersInMostCommentedBlock = new Map();

    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsBoardComponent = new FilmsBoardView();
    this._filmListComponent = new FilmsListView();
    this._mainFilmListContainerComponent = this._filmListComponent.getFilmListContainerComponent();

    this._showMoreButtonComponent = new ShowMoreView();

    this._sortComponent = new SortMenuView();
    this._noFilmsComponent = new NoFilmsView();

    this._filmListComponentTopRated = null;
    this._filmListComponentMostCommented = null;

    this._topRatedFilms = getMostValuedFilms(this._films, sortByRating);
    this._mostCommentedFilms = getMostValuedFilms(this._films, sortByComments);

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._popupPresenter = new PopupPresenter(this._handleFilmChange);
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

  _renderFilmCardInBasicBlock(film) {
    const filmCardPresenter = new FilmCardPresenter(
        this._mainFilmListContainerComponent,
        this._handleFilmChange,
        this._popupPresenter
    );

    filmCardPresenter.init(film, this._mainFilmListContainerComponent);
    this._listRenderedPresentersInBasicBlock.set(film.id, filmCardPresenter);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCardInBasicBlock(film));
  }

  _renderBasicFilmList() {
    render(this._filmsBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmListInBasicBlock() {
    this._listRenderedPresentersInBasicBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersInBasicBlock = new Map();

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);

    // verifying if rendered FilmCard exists in basic Map,
    // this was made for synchronizing of clicking on favorites and etc. in Basic Block and Extra Blocks
    if (this._listRenderedPresentersInBasicBlock.has(updatedFilm.id)) {
      this._listRenderedPresentersInBasicBlock.get(updatedFilm.id).init(updatedFilm);
    }

    // verifying if rendered FilmCard exists in basic Map,
    // this was made for synchronizing of clicking on favorites and etc. in Popup and Extra Blocks
    if (this._listRenderedPresentersInTopRatedBlock.has(updatedFilm.id)) {
      this._listRenderedPresentersInTopRatedBlock.get(updatedFilm.id).init(updatedFilm);
    }

    if (this._listRenderedPresentersInMostCommentedBlock.has(updatedFilm.id)) {
      this._listRenderedPresentersInMostCommentedBlock.get(updatedFilm.id).init(updatedFilm);
    }
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
    this._clearFilmListInBasicBlock();
    this._renderBasicFilmList();

    this._clearExtraBlocks();
    this._renderExtraBlocks();
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmCardPresenterInExtraBlock(filmListContainerComponent, film, blockTitle) {
    const filmCardPresenter = new FilmCardPresenter(
        filmListContainerComponent,
        this._handleFilmChange,
        this._popupPresenter
    );

    filmCardPresenter.init(film);

    if (blockTitle === `Top rated`) {
      this._listRenderedPresentersInTopRatedBlock.set(film.id, filmCardPresenter);
    }

    if (blockTitle === `Most commented`) {
      this._listRenderedPresentersInMostCommentedBlock.set(film.id, filmCardPresenter);
    }
  }

  _renderExtraBlock(title, mostRatedFilms) {
    const filmListComponent = new FilmsListView();
    const filmListContainerComponent = filmListComponent.getFilmListContainerComponent();

    render(this._filmsBoardComponent, filmListComponent, RenderPosition.BEFOREEND);

    filmListComponent.addClassExtra();

    filmListComponent.addTitleForFilmListBlock(title);

    for (let film of mostRatedFilms) {
      this._renderFilmCardPresenterInExtraBlock(filmListContainerComponent, film, title);
    }

    return filmListComponent;
  }

  _renderExtraBlocks() {
    if (this._topRatedFilms.length !== 0 && parseInt(this._topRatedFilms[0].rating, 10) !== 0) {
      this._filmListComponentTopRated = this._renderExtraBlock(`Top rated`, this._topRatedFilms);
    }

    if (this._mostCommentedFilms.length !== 0 && this._mostCommentedFilms[0].comments.length !== 0) {
      this._filmListComponentMostCommented = this._renderExtraBlock(`Most commented`, this._mostCommentedFilms);
    }
  }

  _clearExtraBlocks() {
    this._listRenderedPresentersInTopRatedBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersInMostCommentedBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersInTopRatedBlock = new Map();
    this._listRenderedPresentersInMostCommentedBlock = new Map();

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
    this._renderExtraBlocks();
  }
}
