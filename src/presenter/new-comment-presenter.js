import NewCommentView from "../view/new-comment-view";

import {render, RenderPosition} from "../utils/render-utils";
import {remove} from "../utils/utils";

export default class NewCommentPresenter {
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
