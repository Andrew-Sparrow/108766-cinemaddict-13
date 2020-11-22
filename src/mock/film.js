import {getRandomDescriptions} from "../utils/utils";

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

  return film;
};
