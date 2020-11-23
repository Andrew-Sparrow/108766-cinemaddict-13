import {
  getRandomDescriptions,
  getRandomPhoto
} from "../utils/utils";

import {getRandomDate} from "../utils/common-utils";

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
  };

  film.pictureSrc = getRandomPhoto().src;
  film.title = `The Dance of Life`;
  film.description = getRandomDescriptions();
  film.releaseDate = getRandomDate();

  return film;
};
