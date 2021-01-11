import Abstract from "./abstract";

const createFilmsLoadingTemplate = () => {
  return `<section class="films-list">
            <h2 class="films-list__title">Loading...</h2>
          </section>`;
};

export default class LoadingView extends Abstract {
  getTemplate() {
    return createFilmsLoadingTemplate();
  }
}
