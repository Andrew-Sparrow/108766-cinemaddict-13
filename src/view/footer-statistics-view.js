import Smart from "./smart";

const createFooterStatisticsTemplate = (amountOfFilms) => {
  return `<section class="footer__statistics">
      <p>${amountOfFilms} movies inside</p>
    </section>`;
};

export default class FooterStatisticsView extends Smart {
  constructor(amountOfFilms) {
    super();
    this._amountOfFilms = amountOfFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._amountOfFilms);
  }
}
