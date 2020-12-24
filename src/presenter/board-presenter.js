import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
import ShowMoreView from "../view/show-more-view";
import FilmsListView from "../view/films-list-view";
import FilmCardPresenter from "./film-presenter";
import PopupPresenter from "./popup-presenter";

import {SortType} from "../utils/consts";

import {render, RenderPosition, updateItems} from "../utils/render-utils";

import {getMostValuedFilms, remove, sortByComments, sortByDate, sortByRating} from "../utils/utils";

const FILMS_COUNT_PER_STEP = 5;

export const collectionOfComments = new Map();

export default class BoardPresenter {
  constructor(boardContainer, filmModel) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmModel;

    this._listRenderedPresentersBasicBlock = new Map();
    this._listRenderedPresentersTopRatedBlock = new Map();
    this._listRenderedPresentersMostCommentedBlock = new Map();

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

    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModelEventForRerender = this._handleModelEventForRerender.bind(this);
    this._handleViewActionForModel = this._handleViewActionForModel.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._popupPresenter = new PopupPresenter(this._handleViewActionForModel);

    this._filmsModel.addObserver(this._handleModelEventForRerender);
  }

  init() {
    this._topRatedFilms = getMostValuedFilms(this._filmsModel.getFilms(), sortByRating);
    this._mostCommentedFilms = getMostValuedFilms(this._filmsModel.getFilms(), sortByComments);

    this._renderBoard();
    render(this._boardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.BY_RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
    }
    return this._filmsModel.getFilms();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCardInBasicBlock(film) {
    const filmCardPresenter = new FilmCardPresenter(
        this._mainFilmListContainerComponent,
        this._handleViewActionForModel,
        this._popupPresenter
    );

    filmCardPresenter.init(film, this._mainFilmListContainerComponent);
    this._listRenderedPresentersBasicBlock.set(film.id, filmCardPresenter);
  }

  _renderFilmCards(films) {
    films
      .forEach((film) => this._renderFilmCardInBasicBlock(film));
  }

  _renderBasicFilmList() {
    render(this._filmsBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }


    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_COUNT_PER_STEP));

    this._renderFilmCards(films);

    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmListInBasicBlock() {
    this._listRenderedPresentersBasicBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersBasicBlock = new Map();

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    remove(this._showMoreButtonComponent);
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  // _handleFilmChange(updatedFilm) {
  //   this._films = updateItems(this._films, updatedFilm);
  //
  //   // verifying if rendered FilmCard exists in basic Map,
  //   // this was made for synchronizing of clicking on favorites and etc. in Basic Block and Extra Blocks
  //   if (this._listRenderedPresentersBasicBlock.has(updatedFilm.id)) {
  //     this._listRenderedPresentersBasicBlock.get(updatedFilm.id).init(updatedFilm);
  //   }
  //
  //   // verifying if rendered FilmCard exists in basic Map,
  //   // this was made for synchronizing of clicking on favorites and etc. in Popup and Extra Blocks
  //   if (this._listRenderedPresentersTopRatedBlock.has(updatedFilm.id)) {
  //     this._listRenderedPresentersTopRatedBlock.get(updatedFilm.id).init(updatedFilm);
  //   }
  //
  //   if (this._listRenderedPresentersMostCommentedBlock.has(updatedFilm.id)) {
  //     this._listRenderedPresentersMostCommentedBlock.get(updatedFilm.id).init(updatedFilm);
  //   }
  // }

  _handleViewActionForModel(actionTypeModel, updateTypeRerender, update) {
    console.log(actionTypeModel, updateTypeRerender, update);
    // Здесь будем вызывать обновление модели.
    // actionTypeModel - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateTypeRerender - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEventForRerender(updateTypeRerender, data) {
    console.log(updateTypeRerender, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleShowMoreButtonClick() {

    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP)
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
        this._handleViewActionForModel,
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
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderBasicFilmList();
    this._renderExtraBlocks();
  }
}
