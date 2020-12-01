import AbstractView from "./abstract";

const createFilmsTemplate = () => {
  return `<section class="films">
            <section class="films-list">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container">
              </div>
            </section>
          </section>`;
};

export default class FilmsBoardView extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }

  getFilmListComponent() {
    return this.getElement(`.films-list`);
  }

  getFilmListContainerComponent() {
    return this.getElement(`.films-list__container`);
  }
}