import CommentsTitleView from "../view/comments/comment-title-view";
import {remove, render, RenderPosition, replace} from "../utils/render-utils";


export default class CommentsTitlePresenter {
  constructor(commentsTitleContainer) {
    this._commentsTitleContainer = commentsTitleContainer;
    this._commentsTitleComponent = null;
  }

  init(film) {
    this._film = film;
    const prevCommentsTitleComponent = this._commentsTitleComponent;

    this._film = film;
    this._commentsTitleComponent = new CommentsTitleView(this._film);

    if (prevCommentsTitleComponent === null) {
      render(this._commentsTitleContainer, this._commentsTitleComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._commentsTitleContainer.contains(prevCommentsTitleComponent.getElement())) {
      replace(this._commentsTitleContainer, prevCommentsTitleComponent);
    }

    remove(prevCommentsTitleComponent);
  }

  destroy() {
    remove(this._commentsTitleComponent);
  }
}
