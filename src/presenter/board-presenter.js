import FilmsBoardView from "../view/films-board-view";
import SortMenuView from "../view/sort-menu-view";
import NoFilmsView from "../view/no-films";
// import FilmCardView from "../view/film-card-view";
import ShowMoreView from "../view/show-more-view";

const FILMS_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._boardComponent = new FilmsBoardView();
    this._sortComponent = new SortMenuView();
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreComponent = new ShowMoreView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }
}
