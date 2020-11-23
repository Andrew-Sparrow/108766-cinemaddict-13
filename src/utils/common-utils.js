import {
  DESCRIPTIONS,
  AMOUNT_OF_LETTERS
} from "./consts";

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndexOfList = (items) => {
  const start = 0;
  const end = items.length - 1;

  return getRandomInteger(start, end);
};

export const getRandomAmountOfItems = (items) => {
  const lengthOfListItems = items.length;
  const start = getRandomIndexOfList(items);
  const end = getRandomInteger(start, lengthOfListItems);

  return items.slice(start, end);
};

export const generateDescription = () => {
  const phrases = DESCRIPTIONS.split(`.`);

  const randomPhrases = getRandomAmountOfItems(phrases);
  // console.log(randomPhrases);

  return randomPhrases.join(` `);
};

// get date randomly in past or in future or in present within period of two weeks
export const getRandomDate = () => {
  const randomInteger = getRandomInteger(-7, 7);
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + randomInteger);
  newDate.setHours(newDate.getHours() + getRandomInteger(0, 24));
  newDate.setMinutes(newDate.getMinutes() + getRandomInteger(0, 60));

  return newDate;
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const truncateText = (text) => {
  if (text.length > AMOUNT_OF_LETTERS) {
    return text.substring(0, AMOUNT_OF_LETTERS - 1) + `...`;
  }
  return text;
};
