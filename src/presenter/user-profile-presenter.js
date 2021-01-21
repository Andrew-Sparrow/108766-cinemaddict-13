import UserProfileView from "../view/user-profile-view";

import {
  remove,
  render,
  replace,
  RenderPosition
} from "../utils/render-utils";

import {
  getUserRank
} from "../utils/common-utils";

export default class UserProfilePresenter {
  constructor(container) {
    this._container = container;

    this._component = null;
  }

  init(films) {
    this._films = films;
    const prevUserProfileComponent = this._component;
    const userRank = getUserRank(this._films);

    this._component = new UserProfileView(userRank);

    if (prevUserProfileComponent === null) {
      render(this._container, this._component, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.contains(prevUserProfileComponent.getElement())) {
      replace(this._component, prevUserProfileComponent);
    }

    remove(prevUserProfileComponent);
  }
}
