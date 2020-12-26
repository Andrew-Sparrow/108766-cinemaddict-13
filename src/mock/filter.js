const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length
};

export const calculateFilmsInFilter = (films) => {
  const filterToCount = {};

  for (let [filterName, countFilms] of Object.entries(filmToFilterMap)) {
    filterToCount[filterName] = countFilms(films);
  }

  return filterToCount;
};
