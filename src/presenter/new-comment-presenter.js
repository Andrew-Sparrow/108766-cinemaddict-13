import NewCommentView from "../view/new-comment-view";

import {render, RenderPosition} from "../utils/render-utils";
import {remove} from "../utils/utils";

export default class newCommentPresenter {
  constructor(newCommentContainer) {
    this._newCommentContainer = newCommentContainer.getElement();
  }

  init() {
    this._newCommentComponent = new NewCommentView(); // TODO add argument
    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._newCommentComponent);
  }
}
