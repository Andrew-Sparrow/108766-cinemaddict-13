import Abstract from "../abstract";

const createNoInternetConnectionTemplate = () => {
  return `<section class="comments-list">
            <h2 class="comments-list__title">Ups... There is no internet connection, i can not download the comments</h2>
          </section>`;
};

export default class NoInternetConnectionView extends Abstract {
  getTemplate() {
    return createNoInternetConnectionTemplate();
  }
}
