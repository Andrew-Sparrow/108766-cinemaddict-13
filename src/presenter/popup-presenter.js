import PopupView from "../view/popup-view";
import {remove} from "../utils/utils";

import {
  render,
  RenderPosition
} from "../utils/render-utils";

import CommentsPresenter from "./comments-presenter";
import NewCommentPresenter from "./new-comment-presenter";

export default class PopupPresenter {
  constructor(handleChangeData) {
    this._popupContainerElement = document.body;
    this._handleChangeData = handleChangeData;
    this._popupComponent = null;
    this._prevPopupComponent = null;

    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchList = this._handleWatchList.bind(this);
  }

  init(film) {
    this._film = film;

    this._popupComponent = new PopupView(this._film);

    document.addEventListener(`keydown`, this._handleEscKeyDown);
    this._popupComponent.setPopupCloseClickHandler(this._handlePopupCloseClick);

    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchList);

    if (this._prevPopupComponent === null) {
      render(this._popupContainerElement, this._popupComponent, RenderPosition.BEFOREEND);
      this._renderCommentsBlock(this._film);
      this._renderNewCommentBlock();
      this._prevPopupComponent = this._popupComponent;
    } else {
      remove(this._prevPopupComponent);
      render(this._popupContainerElement, this._popupComponent, RenderPosition.BEFOREEND);
      this._renderCommentsBlock(this._film);
      this._renderNewCommentBlock();
      this._prevPopupComponent = this._popupComponent;
    }
  }

  _renderCommentsBlock(film) {
    const commentsPresenter = new CommentsPresenter(this._popupComponent.getCommentsTitleElement());

    commentsPresenter.init(film);
  }

  _renderNewCommentBlock() {
    const newComment = new NewCommentPresenter(this._popupComponent.getCommentsWrapElement());
    newComment.init();
  }

  _handleFeaturesClick(updatedData) {
    const newData = Object.assign({}, this._film, updatedData);
    this._handleChangeData(newData);
    this.init(newData);
  }

  _handleFavoriteClick() {
    this._handleFeaturesClick({isFavorite: !this._film.isFavorite});
  }

  _handleWatchedClick() {
    this._handleFeaturesClick({isWatched: !this._film.isWatched});
  }

  _handleWatchList() {
    this._handleFeaturesClick({isInWatchlist: !this._film.isInWatchlist});
  }

  _handlePopupCloseClick() {
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      // this._popupComponent.reset(this._film);
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
    }
  }
}
