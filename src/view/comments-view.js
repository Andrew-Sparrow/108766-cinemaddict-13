import dayjs from "dayjs";
import {collectionOfComments} from "../mock/comments";

const getCommentTemplate = (commentID) => {

  const comment = collectionOfComments.get(commentID);

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format(`YYYY/MM/DD HH:SS`)}</span>
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
