// import {nanoid} from 'nanoid';
// import {EMOTIONS} from "../utils/consts";
// import {getRandomInteger} from "../utils/common-utils";
//
// const MIN_AMOUNT_OF_COMMENTS = 0;
// const MAX__AMOUNT_OF_COMMENTS = 5;
//
// export const generateComment = () => {
//   const comment = {
//     id: null,
//     text: ``,
//     emotion: null,
//     author: null,
//     date: null,
//   };
//
//   comment.id = nanoid();
//   comment.text = `Interesting setting and a good cast.`;
//   comment.emotion = EMOTIONS[0];
//   comment.author = `Tim Macoveev`;
//   comment.date = new Date();
//
//   return comment;
// };
//
// export const generateCommentsID = () => {
//   const commentsID = [];
//
//   const numberOfCycles = getRandomInteger(MIN_AMOUNT_OF_COMMENTS, MAX__AMOUNT_OF_COMMENTS);
//
//   for (let i = 0; i < numberOfCycles; i++) {
//     let newComment = generateComment();
//     commentsID.push(newComment.id);
//     // collectionOfComments.set(newComment.id, newComment);
//   }
//
//   return commentsID;
// };
