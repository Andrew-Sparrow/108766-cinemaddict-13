// import {GENRES} from "../utils/consts";
// import {nanoid} from 'nanoid';
// import {getRandomAmountOfItems} from "../utils/random-utils";
//
// import {
//   generateDate,
//   getRandomDescriptions,
//   getRandomPoster,
// } from "../utils/utils";
//
// import {
//   getRandomInteger,
// } from "../utils/common-utils";
//
// import {generateCommentsID} from "./comments";
//
// const MIN_RATING = `1`;
// const MAX_RATING = `10`;
// let START_NUMBER_FOR_TITLE = 0;
//
// export const generateFilm = () => {
//
//   const film = {
//     id: null,
//     poster: ``,
//     title: null,
//     originalTitle: null,
//     rating: null,
//     director: null,
//     screenwriters: [],
//     actors: [],
//     releaseDate: null,
//     duration: null,
//     country: null,
//     genres: [],
//     description: null,
//     ageRating: null,
//     comments: [],
//     isFavorite: false,
//     isInWatchlist: false,
//     isWatched: false,
//     watchingDate: ``,
//   };
//
//   film.id = nanoid();
//   film.poster = getRandomPoster();
//   film.title = `Title - ` + ++START_NUMBER_FOR_TITLE;
//   film.originalTitle = `The Dance of Life`;
//   film.rating = `${getRandomInteger(MIN_RATING, MAX_RATING)}.0`;
//   film.director = `Steven Spielberg`;
//   film.screenwriters = [`Billy Wilder`, `Robert Towne`, `Quentin Tarantino`];
//   film.actors = [`Tom Hanks`, `Jack Nicholson`, `Cate Blanchett`];
//   film.releaseDate = generateDate();
//   film.duration = 77;
//   film.country = `New Zealand`;
//   film.genres = getRandomAmountOfItems(GENRES);
//   film.description = getRandomDescriptions();
//   film.ageRating = `18+`;
//   film.comments = generateCommentsID();
//   film.isFavorite = Boolean(getRandomInteger(0, 1));
//   film.isInWatchlist = Boolean(getRandomInteger(0, 1));
//   film.isWatched = Boolean(getRandomInteger(0, 1));
//   film.watchingDate = `2020-11-20T16:12:32.554Z`;
//
//   return film;
// };
