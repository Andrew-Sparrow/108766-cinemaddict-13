import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const countWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
  return films.reduce((counter, film) => {
    if (film.isWatched === null) {
      return counter;
    }

    // С помощью day.js проверям, сколько фильмов
    // попадают в диапазон дат
    if (
      dayjs(film.isWatched).isSame(dateFrom) ||
      dayjs(film.isWatched).isBetween(dateFrom, dateTo) ||
      dayjs(film.isWatched).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);
};
