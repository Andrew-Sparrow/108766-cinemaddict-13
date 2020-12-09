import dayjs from "dayjs";
import Abstract from "../view/abstract";

import {
  DESCRIPTIONS,
  pictureTitles
} from "./consts";

import {
  getRandomIndexOfList,
  getRandomInteger
} from "./common-utils.js";


const MIN_AMOUNT_PHRASES = 1;
const MAX_AMOUNT_PHRASES = 5;
const YEARS_AGO_AMOUNT = 5;
const MAX_AMOUNT_EXTRA_CARDS = 2;


export const getRandomDescriptions = () => {
  const sumStrings = [];
  const phrases = DESCRIPTIONS.split(`.`);

  for (let i = 0; i < getRandomInteger(MIN_AMOUNT_PHRASES, MAX_AMOUNT_PHRASES); i++) {
    sumStrings.push(phrases[getRandomIndexOfList(phrases)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPoster = () => {
  const poster = {};
  const posterTitle = pictureTitles[getRandomInteger(0, pictureTitles.length - 1)];
  poster.src = `./images/posters/${posterTitle}`;
  poster.description = `poster of movie`;

  return poster;
};

export const generateDate = () => {
  const yearsAgoAmount = getRandomInteger(0, YEARS_AGO_AMOUNT);
  return dayjs().subtract(yearsAgoAmount, `year`).toDate();
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const formatCommentDate = (date) => {
  return dayjs(date).format(`YYYY/MM/DD HH:SS`);
};

export const formatReleaseDate = (date) => {
  return dayjs(date).format(`DD MMMM YYYY`);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Only components can be removed`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const sortByDate = (filmA, filmB) => {
  const result = dayjs(filmA.releaseDate).isBefore(dayjs(filmB.releaseDate));
  return result ? 1 : -1;
};


export const sortByRating = (filmA, filmB) => {
  const result = parseInt(filmB.rating, 10) - parseInt(filmA.rating, 10);

  return result;
};

export const sortByComments = (filmA, filmB) => {
  const result = filmB.comments.length - filmA.comments.length;

  return result;
};

export const getMostValuedFilms = (films, sortByCallback) => {
  const mostRatedFilms = [];
  films.slice().sort(sortByCallback);

  const lengthExtraFilmList = films.length > MAX_AMOUNT_EXTRA_CARDS ? MAX_AMOUNT_EXTRA_CARDS : films.length;

  for (let i = 0; i < lengthExtraFilmList; i++) {
    mostRatedFilms.push(films[i]);
  }

  return mostRatedFilms;
};
