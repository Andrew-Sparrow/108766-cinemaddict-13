import NewCommentView from "../view/new-comment-view";

import {remove, render, RenderPosition} from "../utils/render-utils";

export default class PopupNewCommentPresenter {
  constructor(newCommentContainer) {
    this._newCommentContainer = newCommentContainer;
  }

  init() {
    this._newCommentComponent = new NewCommentView();

    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setCommentSubmitHandler();
  }

  destroy() {
    remove(this._newCommentComponent);
  }
}
