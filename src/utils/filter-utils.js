import {FilterType} from "./consts";

const filmToFilterMap = {
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};

export const calculateFilmsInFilter = (films) => {
  const filterToCount = {};

  for (let [filterName, filteredFilms] of Object.entries(filmToFilterMap)) {
    filterToCount[filterName] = filteredFilms(films);
  }

  return filterToCount;
};
