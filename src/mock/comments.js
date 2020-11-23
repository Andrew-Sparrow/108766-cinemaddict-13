import {nanoid} from 'nanoid';

export const generateComment = () => {
  const comment = {
    id: null,
    text: ``,
    emotion: null,
    author: null,
    date: null,
  };

  comment.id = nanoid();
  comment.text = `awesome!`;
  comment.emotion = `smile`;
  comment.author = `John Doe`;
  comment.date = new Date();

  return comment;
};
