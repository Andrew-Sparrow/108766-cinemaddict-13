import Abstract from "./abstract";
import {UserRanks} from "../utils/consts";

const createUserProfileTemplate = (userRank) => {
  return `<section class="header__profile profile">
    ${userRank === UserRanks.NO_RANK ? `` : `<p class="profile__rating">${userRank}</p>`}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserProfileView extends Abstract {
  constructor(userRank) {
    super();
    this._userRank = userRank;
  }

  getTemplate() {
    return createUserProfileTemplate(this._userRank);
  }
}
