export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomAmountOfItems = (items) => {
  const lengthOfListItems = items.length;
  const start = 0;
  const end = getRandomInteger(start, lengthOfListItems);

  return items.slice(start, end);
};
