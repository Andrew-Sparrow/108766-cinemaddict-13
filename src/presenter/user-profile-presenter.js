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
  constructor(userProfileContainer) {
    this._userProfileContainer = userProfileContainer;

    this._userProfileComponent = null;
  }

  init(films) {
    this._films = films;
    const prevUserProfileComponent = this._userProfileComponent;
    const userRank = getUserRank(this._films);

    this._userProfileComponent = new UserProfileView(userRank);

    if (prevUserProfileComponent === null) {
      render(this._userProfileContainer, this._userProfileComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._userProfileContainer.contains(prevUserProfileComponent.getElement())) {
      replace(this._userProfileComponent, prevUserProfileComponent);
    }

    remove(prevUserProfileComponent);
  }
}
