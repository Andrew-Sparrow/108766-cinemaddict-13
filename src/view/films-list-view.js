import AbstractView from "./abstract";

const createFilmsListTemplate = () => {
  return `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container">
            </div>
          </section>`;
};

export default class FilmsListView extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getFilmListTitleComponent() {
    return this.getElement(`.films-list__title`);
  }

  getFilmListContainerComponent() {
    return this.getElement(`.films-list__container`);
  }

  addTitleForFilmListBlock(title) {
    const filmListTitleComponent = this.getFilmListTitleComponent();
    filmListTitleComponent.classList.remove(`visually-hidden`);
    filmListTitleComponent.innerHTML = title;
  }

  addClassExtra() {
    this.getElement().classList.add(`films-list--extra`);
  }
}
