import CommentsTitleView from "../view/comments/comment-title-view";

import {
  remove,
  render,
  replace,
  RenderPosition
} from "../utils/render-utils";

export default class CommentsTitlePresenter {
  constructor(container) {
    this._container = container;
    this._component = null;
  }

  init(film) {
    this._film = film;
    const prevCommentsTitleComponent = this._component;

    this._film = film;
    this._component = new CommentsTitleView(this._film);

    if (prevCommentsTitleComponent === null) {
      render(this._container, this._component, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._component, prevCommentsTitleComponent);
    remove(prevCommentsTitleComponent);
  }

  destroy() {
    remove(this._component);
  }
}
