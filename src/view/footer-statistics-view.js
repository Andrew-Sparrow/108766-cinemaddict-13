import Abstract from "./abstract";

const createFooterStatisticsTemplate = (amountOfFilms) => {
  return `<section class="footer__statistics">
      <p>${amountOfFilms} movies inside</p>
    </section>`;
};

export default class FooterStatisticsView extends Abstract {
  constructor(amountOfFilms) {
    super();
    this._amountOfFilms = amountOfFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._amountOfFilms);
  }
}
