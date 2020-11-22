import {DESCRIPTIONS} from "./consts";

import {
  getRandomInteger,
  getRandomIndexOfList,
} from "./common-utils.js";

const MIN_AMOUNT_PHRASES = 1;
const MAX_AMOUNT_PHRASES = 5;

export const getRandomDescriptions = () => {
  const sumStrings = [];
  const phrases = DESCRIPTIONS.split(`.`);

  for (let i = 0; i < getRandomInteger(MIN_AMOUNT_PHRASES, MAX_AMOUNT_PHRASES); i++) {
    sumStrings.push(phrases[getRandomIndexOfList(phrases)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPhotosSrc = () => {
  const photos = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    const photo = {};
    photo.src = `img/photos/${getRandomInteger(1, 5)}.jpg`;
    photo.description = ``;
    photos.push(photo);
  }

  return photos;
};

export const getRandomPropertyOfObject = (obj) => {
  const properties = Object.keys(obj);
  return properties[getRandomIndexOfList(properties)];
};

/**
 * This function groups events by day.
 * @param {Object[]} objects - The array of events.
 * @param {String} key - The key in the trip event.
 * @return {Object[]} Returns array of entries of events
 */
export const groupArrayOfObjects = (objects, key) => {
  const items = objects.reduce((receiver, current) => {
    receiver[current[key].toDateString()] = receiver[current[key].toDateString()] || [];
    receiver[current[key].toDateString()].push(current);

    return receiver;
  }, {});
  return Object.entries(items);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
