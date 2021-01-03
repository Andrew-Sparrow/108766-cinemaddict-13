import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const countWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
  return films.reduce((counter, film) => {
    if (film.isWatched === false) {
      return counter;
    }

    // С помощью day.js проверям, сколько фильмов
    // попадают в диапазон дат
    if (
      dayjs(film.watchingDate).isSame(dateFrom) ||
      dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(film.watchingDate).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);
};
