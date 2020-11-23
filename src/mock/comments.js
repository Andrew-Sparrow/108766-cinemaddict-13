export const generateComment = () => {
  const comment = {
    text: ``,
    emotion: null,
    author: null,
    date: null,
  };

  comment.text = `awesome!`;
  comment.emotion = `smile`;
  comment.author = `John Doe`;
  comment.date = new Date();

  return comment;
};
