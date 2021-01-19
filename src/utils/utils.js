import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(duration);

dayjs.updateLocale(`en`, {
  relativeTime: {
    future: `in %s`,
    past: `%s ago`,
    s: `a few seconds`,
    m: `a minute`,
    mm: `%d minutes`,
    h: `an hour`,
    hh: `%d hours`,
    d: `a day`,
    dd: `%d days`,
    M: `a month`,
    MM: `%d months`,
    y: `a year`,
    yy: `%d years`
  }
});

const MAX_AMOUNT_EXTRA_CARDS = 2;

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const formatCommentDate = (date) => {
  return dayjs(date).fromNow();
};

export const formatReleaseDate = (date) => {
  return dayjs(date).format(`DD MMMM YYYY`);
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
  const mostValuedFilms = [];
  films = films.slice().sort(sortByCallback);

  const lengthExtraFilmList = films.length > MAX_AMOUNT_EXTRA_CARDS ? MAX_AMOUNT_EXTRA_CARDS : films.length;

  for (let i = 0; i < lengthExtraFilmList; i++) {
    mostValuedFilms.push(films[i]);
  }
  return mostValuedFilms;
};
