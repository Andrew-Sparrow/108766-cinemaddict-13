import Abstract from "./abstract";

const createNoFilmsTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilmsView extends Abstract {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
