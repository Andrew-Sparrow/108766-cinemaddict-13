import {getRandomDescriptions} from "../utils/utils";
import {getRandomDate} from "../utils/common-utils";

export const generateFilm = () => {

  const film = {
    pictureSrc: `./images/posters/the-dance-of-life.jpg`,
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

  film.pictureSrc = `./images/posters/the-dance-of-life.jpg`;
  film.description = getRandomDescriptions();
  film.releaseDate = getRandomDate();

  return film;
};
