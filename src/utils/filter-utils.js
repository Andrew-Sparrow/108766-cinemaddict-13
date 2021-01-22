import {MenuItem} from "./consts";

const filmToFilterMap = {
  [MenuItem.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [MenuItem.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [MenuItem.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};

export const calculateFilmsInFilter = (films) => {
  const filterToCount = {};

  for (const [filterName, filteredFilms] of Object.entries(filmToFilterMap)) {
    filterToCount[filterName] = filteredFilms(films);
  }

  return filterToCount;
};
