import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import {
  AMOUNT_OF_LETTERS
} from "./consts";

import {USER_RANKS} from "./consts";

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

export const getRandomDate = () => {
  const randomInteger = getRandomInteger(-7, 7);
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + randomInteger);
  newDate.setHours(newDate.getHours() + getRandomInteger(0, 24));
  newDate.setMinutes(newDate.getMinutes() + getRandomInteger(0, 60));

  return newDate;
};

export const getUserRank = (films) => {
  let userRank = ``;

  const amountWatchedFilms = getWatchedFilms(films).length;

  if (amountWatchedFilms === 0) {
    userRank = USER_RANKS.NO_RANK;
  } else if (amountWatchedFilms > 0 && amountWatchedFilms < 11) {
    userRank = USER_RANKS.NOVICE;
  } else if (amountWatchedFilms > 10 && amountWatchedFilms < 21) {
    userRank = USER_RANKS.FAN;
  } else if (amountWatchedFilms > 20) {
    userRank = USER_RANKS.MOVIE_BUFF;
  }

  return userRank;
};

export const getTimePropertiesOfTotalFilmsDuration = (timeOfDuration) => {

  const hoursFilmDuration = Math.floor(dayjs.duration(timeOfDuration, `minutes`).asHours());
  const minutesFilmDuration = timeOfDuration - (hoursFilmDuration * 60);
  const propertiesOfFilmDuration = {};

  propertiesOfFilmDuration.hours = hoursFilmDuration;
  propertiesOfFilmDuration.minutes = minutesFilmDuration;

  return propertiesOfFilmDuration;
};

export const getTotalFilmDuration = (films) => {
  const totalDuration = films.reduce((accumulator, currentFilm) => {
    return accumulator + parseInt(currentFilm.duration, 10);
  }, 0);

  return totalDuration;
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};
