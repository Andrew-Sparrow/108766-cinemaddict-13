import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";

import {StatisticsAmountDays} from "./consts";

dayjs.extend(isBetween);
dayjs.extend(isToday);

export const countFilmsByGenres = (films) => {
  const filmsGenres = {};

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      if (genre in filmsGenres) {
        filmsGenres[genre] = filmsGenres[genre] + 1;
      } else {
        filmsGenres[genre] = 1;
      }
    });
  });

  return filmsGenres;
};

export const getTopGenre = (countedFilmsByGenres) => {
  let topGenre = ``;
  let maxCountedGenre = 0;

  for (let property in countedFilmsByGenres) {
    if (countedFilmsByGenres[property] > maxCountedGenre) {
      topGenre = property;
      maxCountedGenre = countedFilmsByGenres[property];
    }
  }
  return topGenre;
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

export const getTodayWatchedFilms = (watchedFilms) => {
  return watchedFilms.filter((film) => dayjs(film.watchingDate).isToday());
};

export const getWatchedFilmsInDateRange = (watchedFilms, dateFrom) => {
  // get today's day
  const dateTo = dayjs().toDate();
  dateFrom = dayjs().subtract(dateFrom, `day`).toDate();

  switch (dateFrom) {
    case StatisticsAmountDays.WEEK:
      dateFrom = StatisticsAmountDays.WEEK;
      break;
  }

  return watchedFilms.filter((watchedFilm) => {
    return dayjs(watchedFilm.watchingDate).isSame(dateFrom) ||
           dayjs(watchedFilm.watchingDate).isBetween(dateFrom, dateTo) ||
           dayjs(watchedFilm.watchingDate).isSame(dateTo);
  });
};
