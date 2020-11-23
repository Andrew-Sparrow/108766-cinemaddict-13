import {GENRES} from "../utils/consts";

import {
  generateDate,
  getRandomDescriptions,
  getRandomPoster,
} from "../utils/utils";

import {
  getRandomInteger,
} from "../utils/common-utils";

import {generateComment} from "./comments";

export const generateComments = () => {
  const comments = [];

  const numberOfCycles = getRandomInteger(1, 5);

  for (let i = 0; i < numberOfCycles; i++) {
    comments.push(generateComment());
  }

  return comments;
};

export const generateFilm = () => {

  const film = {
    pictureSrc: ``,
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
    comments: []
  };

  const commentsID = generateComments().map((comment) => comment.id);

  film.pictureSrc = getRandomPoster().src;
  film.title = `The Dance of Life`;
  film.rating = `8.0`;
  film.director = `Steven Spielberg`;
  film.screenwriters = [`Billy Wilder`, `Robert Towne`, `Quentin Tarantino`];
  film.actors = [`Robert De Niro`, `Jack Nicholson`, ` Denzel Washington`];
  film.releaseDate = generateDate();
  film.duration = `1h 55m`;
  film.country = `New Zealand`;
  film.genres = GENRES[0];
  film.description = getRandomDescriptions();
  film.ageRating = 18;
  film.comments = commentsID;

  return film;
};
