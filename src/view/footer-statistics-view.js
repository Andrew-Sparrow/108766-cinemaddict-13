import {createElement} from "../utils/render-utils";

const createFooterStatisticsTemplate = (amountOfFilms) => {
  return `<section class="footer__statistics">
      <p>${amountOfFilms} movies inside</p>
    </section>`;
};

export default class FooterStatisticsView {
  constructor(amountOfFilms) {
    this._element = null;
    this._amountOfFilms = amountOfFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._amountOfFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
