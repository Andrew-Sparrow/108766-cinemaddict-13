import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import {
  AMOUNT_OF_LETTERS,
  BASE,
  MAX_AMOUNT_WATCHED_FILMS_FAN,
  MAX_AMOUNT_WATCHED_FILMS_NOVICE,
  MINUTES_IN_HOUR,
  UserRanks,
} from "./consts";

import {getWatchedFilms} from "./statistics-utils";

dayjs.extend(duration);

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const truncateText = (text) => {
  if (text.length > AMOUNT_OF_LETTERS) {
    return text.substring(0, AMOUNT_OF_LETTERS - 1) + `...`;
  }
  return text;
};

export const getUserRank = (films) => {
  let userRank = ``;

  const amountWatchedFilms = getWatchedFilms(films).length;

  if (amountWatchedFilms === 0) {
    userRank = UserRanks.NO_RANK;
  } else if (amountWatchedFilms > 0 && amountWatchedFilms <= MAX_AMOUNT_WATCHED_FILMS_NOVICE) {
    userRank = UserRanks.NOVICE;
  } else if (amountWatchedFilms > MAX_AMOUNT_WATCHED_FILMS_NOVICE && amountWatchedFilms <= MAX_AMOUNT_WATCHED_FILMS_FAN) {
    userRank = UserRanks.FAN;
  } else if (amountWatchedFilms > MAX_AMOUNT_WATCHED_FILMS_FAN) {
    userRank = UserRanks.MOVIE_BUFF;
  }

  return userRank;
};

export const getTimePropertiesOfTotalFilmsDuration = (timeOfDuration) => {

  const hoursFilmDuration = Math.floor(dayjs.duration(timeOfDuration, `minutes`).asHours());
  const minutesFilmDuration = timeOfDuration - (hoursFilmDuration * MINUTES_IN_HOUR);
  const propertiesOfFilmDuration = {};

  propertiesOfFilmDuration.hours = hoursFilmDuration;
  propertiesOfFilmDuration.minutes = minutesFilmDuration;

  return propertiesOfFilmDuration;
};

export const getTotalFilmDuration = (films) => {
  const totalDuration = films.reduce((accumulator, currentFilm) => {
    return accumulator + parseInt(currentFilm.duration, BASE);
  }, 0);

  return totalDuration;
};

export const isOnline = () => {
  return window.navigator.onLine;
};
