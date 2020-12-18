import {formatCommentDate} from "../utils/utils";
import {collectionOfComments} from "../presenter/board-presenter";
import Smart from "./smart";

const getCommentTemplate = (commentID) => {

  const comment = collectionOfComments.get(commentID);

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};

export const getCommentsTemplate = (commentsID) => {
  const listOfCommentTemplates = commentsID.map((commentID) => getCommentTemplate(commentID)).join(``);

  return `<ul class="film-details__comments-list">
          ${listOfCommentTemplates}
        </ul>`;
};

export default class CommentsView extends Smart {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    getCommentsTemplate(this._film.comments);
  }
}
