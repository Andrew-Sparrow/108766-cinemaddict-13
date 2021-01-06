import Smart from "../smart";

const createCommentsTitleTemplate = (film) => {
  const {comments} = film;

  return `<h3 class="film-details__comments-title">Comments<span class="film-details__comments-count">
              ${comments.length}
            </span>
          </h3>`;
};

export default class CommentsTitleView extends Smart {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCommentsTitleTemplate(this._film);
  }
}
