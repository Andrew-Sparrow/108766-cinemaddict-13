import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
import ShowMoreView from "../view/show-more-view";
import FilmsListView from "../view/films-list-view";
import FilmCardPresenter from "./film-presenter";
import PopupPresenter from "./popup-presenter";
import StatisticsView from "../view/statistics-view";

import {
  MenuItem,
  SortType,
  UpdateTypeForRerender,
} from "../utils/consts";

import {
  remove,
  render,
  RenderPosition,
} from "../utils/render-utils";

import {
  getMostValuedFilms,
  sortByComments,
  sortByDate,
  sortByRating
} from "../utils/utils";

import {calculateFilmsInFilter} from "../utils/filter-utils";
import StatisticsInfoView from "../view/statistics-info-view";
import StatisticsDiagramView from "../view/statistics-diagram-view";

const FILMS_COUNT_PER_STEP = 5;

export const collectionOfComments = new Map();

export default class BoardPresenter {
  constructor(boardContainer, filmModel, filterModel) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmModel;
    this._filterModel = filterModel;

    this._listRenderedPresentersBasicBlock = new Map();
    this._listRenderedPresentersTopRatedBlock = new Map();
    this._listRenderedPresentersMostCommentedBlock = new Map();

    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsBoardComponent = new FilmsBoardView();
    this._filmListComponent = new FilmsListView();
    this._mainFilmListContainerComponent = this._filmListComponent.getFilmListContainerComponent();

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._noFilmsComponent = new NoFilmsView();
    this._statisticsComponent = null;

    this._filmListComponentTopRated = null;
    this._filmListComponentMostCommented = null;

    this._handleViewActionForFilmModel = this._handleViewActionForFilmModel.bind(this);
    this._handleModelEventForRerender = this._handleModelEventForRerender.bind(this);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._popupPresenter = new PopupPresenter(this._handleViewActionForFilmModel, this._filmsModel);

    this._filmsModel.addObserver(this._handleModelEventForRerender);
    this._filterModel.addObserver(this._handleModelEventForRerender);
  }

  init() {

    this._renderBoard();
  }

  _destroyBoard() {
    this._clearSort();
    this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});

    // this._filmsModel.removeObserver(this._handleModelEventForRerender);
    // this._filterModel.removeObserver(this._handleModelEventForRerender);
  }

  _getFilms() {

    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getItems();
    let filteredFilms = [];

    if (filterType === MenuItem.ALL) {
      filteredFilms = films;
    } else {
      filteredFilms = calculateFilmsInFilter(films)[filterType];
    }

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      remove(this._sortComponent);
      this._sortComponent = null;
    }

    this._sortComponent = new SortMenuView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _clearSort() {
    remove(this._sortComponent);
  }

  _renderFilmCardInBasicBlock(film) {
    const filmCardPresenter = new FilmCardPresenter(
        this._mainFilmListContainerComponent,
        this._handleViewActionForFilmModel,
        this._popupPresenter
    );

    filmCardPresenter.init(film);
    this._listRenderedPresentersBasicBlock.set(film.id, filmCardPresenter);
  }

  _renderFilmCards(films) {
    films
      .forEach((film) => this._renderFilmCardInBasicBlock(film));
  }

  _renderBasicFilmList() {
    render(this._boardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmCount));

    this._renderFilmCards(films);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    remove(this._sortComponent);
    render(this._boardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleViewActionForFilmModel(updateTypeRerender, updatedItem) {
    // for films we only can update items
    this._filmsModel.updateItems(updateTypeRerender, updatedItem);
  }

  _handleModelEventForRerender(updateTypeRerender, updatedFilm) {
    switch (updateTypeRerender) {
      case UpdateTypeForRerender.PATCH:

        // verifying if rendered FilmCard exists in basic Map,
        // this was made for synchronizing of clicking on favorites and etc. in Basic Block and Extra Blocks
        if (this._listRenderedPresentersBasicBlock.has(updatedFilm.id)) {
          this._listRenderedPresentersBasicBlock.get(updatedFilm.id).init(updatedFilm);
        }

        // verifying if rendered FilmCard exists in basic Map,
        // this was made for synchronizing of clicking on favorites and etc. in Popup and Extra Blocks
        if (this._listRenderedPresentersTopRatedBlock.has(updatedFilm.id)) {
          this._listRenderedPresentersTopRatedBlock.get(updatedFilm.id).init(updatedFilm);
        }

        if (this._listRenderedPresentersMostCommentedBlock.has(updatedFilm.id)) {
          this._listRenderedPresentersMostCommentedBlock.get(updatedFilm.id).init(updatedFilm);
        }

        this._clearExtraBlocks();
        this._renderExtraBlocks();
        break;
      case UpdateTypeForRerender.MINOR:
        remove(this._statisticsComponent);
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateTypeForRerender.MAJOR:
        remove(this._statisticsComponent);
        this._destroyBoard();
        this.init();
        break;
      case UpdateTypeForRerender.STATS:
        this._destroyBoard();
        this._statisticsComponent = new StatisticsView(this._filmsModel.getItems());

        render(this._boardContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
        render(this._statisticsComponent, new StatisticsInfoView(this._filmsModel.getItems()), RenderPosition.BEFOREEND);
        render(this._statisticsComponent, new StatisticsDiagramView(this._filmsModel.getItems()), RenderPosition.BEFOREEND);
        break;
    }
  }

  _handleShowMoreButtonClick() {

    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmsCount);

    this._renderFilmCards(films);
    this._renderedFilmCount = newRenderedFilmsCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});

    this._renderSort();
    this._renderBasicFilmList();
    this._renderExtraBlocks();
  }

  _clearFilmListInBasicBlock() {
    this._listRenderedPresentersBasicBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersBasicBlock = new Map();

    remove(this._showMoreButtonComponent);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {

    this._clearFilmListInBasicBlock();
    this._clearExtraBlocks();

    remove(this._sortComponent);
    remove(this._noFilmsComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCardPresenterInExtraBlock(filmListContainerComponent, film, blockTitle) {
    const filmCardPresenter = new FilmCardPresenter(
        filmListContainerComponent,
        this._handleViewActionForFilmModel,
        this._popupPresenter
    );

    filmCardPresenter.init(film);

    if (blockTitle === `Top rated`) {
      this._listRenderedPresentersTopRatedBlock.set(film.id, filmCardPresenter);
    }

    if (blockTitle === `Most commented`) {
      this._listRenderedPresentersMostCommentedBlock.set(film.id, filmCardPresenter);
    }
  }

  _renderExtraBlock(blockTitle, mostValuedFilms) {
    const filmListComponent = new FilmsListView();
    const filmListContainerComponent = filmListComponent.getFilmListContainerComponent();

    render(this._filmsBoardComponent, filmListComponent, RenderPosition.BEFOREEND);

    filmListComponent.addClassExtra();

    filmListComponent.addTitleForFilmListBlock(blockTitle);

    for (let film of mostValuedFilms) {
      this._renderFilmCardPresenterInExtraBlock(filmListContainerComponent, film, blockTitle);
    }

    return filmListComponent;
  }

  _renderExtraBlocks() {
    this._topRatedFilms = getMostValuedFilms(this._filmsModel.getItems(), sortByRating);
    this._mostCommentedFilms = getMostValuedFilms(this._filmsModel.getItems(), sortByComments);

    if (this._topRatedFilms.length !== 0 && parseInt(this._topRatedFilms[0].rating, 10) !== 0) {
      this._filmListComponentTopRated = this._renderExtraBlock(`Top rated`, this._topRatedFilms);
    }

    if (this._mostCommentedFilms.length !== 0 && this._mostCommentedFilms[0].comments.length !== 0) {
      this._filmListComponentMostCommented = this._renderExtraBlock(`Most commented`, this._mostCommentedFilms);
    }
  }

  _clearExtraBlocks() {
    this._listRenderedPresentersTopRatedBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersMostCommentedBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersTopRatedBlock = new Map();
    this._listRenderedPresentersMostCommentedBlock = new Map();

    remove(this._filmListComponentTopRated);
    remove(this._filmListComponentMostCommented);
  }

  _renderBoard() {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderBasicFilmList();
    this._renderExtraBlocks();
  }
}
