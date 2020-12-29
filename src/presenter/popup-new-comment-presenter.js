import NewCommentView from "../view/new-comment-view";

import {remove, render, RenderPosition} from "../utils/render-utils";

export default class PopupNewCommentPresenter {
  constructor(newCommentContainer) {
    this._newCommentContainer = newCommentContainer;
    // this._getTempCommentData = getTempCommentData;
  }

  init(newCommentData) {
  // init() {
    this._newCommentComponent = new NewCommentView(newCommentData);
    // this._newCommentComponent = new NewCommentView(this._getTempCommentData());

    render(this._newCommentContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setCommentSubmitHandler();
  }

  destroy() {
    remove(this._newCommentComponent);
  }
}
