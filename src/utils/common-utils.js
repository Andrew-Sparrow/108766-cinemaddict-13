import {
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

export const truncateText = (text) => {
  if (text.length > AMOUNT_OF_LETTERS) {
    return text.substring(0, AMOUNT_OF_LETTERS - 1) + `...`;
  }
  return text;
};

// export const createImageElement
