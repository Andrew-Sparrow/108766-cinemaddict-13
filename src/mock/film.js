import {GENRES} from "../utils/consts";

import {
  generateDate,
  getRandomDescriptions,
  getRandomPoster,
} from "../utils/utils";

import {
  getRandomInteger,
} from "../utils/common-utils";

import {generateComments} from "./comments";

const MIN_RATING = `1`;
const MAX_RATING = `10`;

export const generateFilm = () => {

  const film = {
    poster: ``,
    title: null,
    originalTitle: null,
    rating: null,
    director: null,
    screenwriters: [],
    actors: [],
    releaseDate: null,
    duration: null,
    country: null,
    genres: [],
    description: null,
    ageRating: null,
    comments: [],
    isFavorite: false,
    isInWatchlist: false,
    isWatched: false
  };

  film.poster = getRandomPoster();
  film.title = `The Dance of Life`;
  film.originalTitle = `The Dance of Life`;
  film.rating = `${getRandomInteger(MIN_RATING, MAX_RATING)}.0`;
  film.director = `Steven Spielberg`;
  film.screenwriters = [`Billy Wilder`, `Robert Towne`, `Quentin Tarantino`];
  film.actors = [`Tom Hanks`, `Jack Nicholson`, `Cate Blanchett`];
  film.releaseDate = generateDate();
  film.duration = `1h 55m`;
  film.country = `New Zealand`;
  film.genres = GENRES;
  film.description = getRandomDescriptions();
  film.ageRating = `18+`;
  film.comments = generateComments();
  film.isInWatchlist = Boolean(getRandomInteger(0, 1));
  film.isWatched = Boolean(getRandomInteger(0, 1));
  film.isFavorite = Boolean(getRandomInteger(0, 1));

  return film;
};
