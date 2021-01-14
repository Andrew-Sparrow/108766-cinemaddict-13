import CommentsTitleView from "../view/comments/comment-title-view";

import {
  remove,
  render,
  replace,
  RenderPosition
} from "../utils/render-utils";

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

    replace(this._commentsTitleComponent, prevCommentsTitleComponent);
    remove(prevCommentsTitleComponent);
  }

  destroy() {
    remove(this._commentsTitleComponent);
  }
}
