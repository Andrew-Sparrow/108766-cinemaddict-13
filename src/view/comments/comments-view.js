import Smart from "../smart";

const getCommentsTemplate = () => {
  return `<ul class="film-details__comments-list">
        </ul>`;
};

export default class CommentsView extends Smart {
  constructor() {
    super();
  }

  getTemplate() {
    return getCommentsTemplate();
  }
}
