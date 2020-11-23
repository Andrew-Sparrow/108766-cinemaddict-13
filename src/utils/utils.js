import dayjs from "dayjs";
import {DESCRIPTIONS} from "./consts";
import {pictureTitles} from "./consts";

import {
  getRandomInteger,
  getRandomIndexOfList,
} from "./common-utils.js";

const MIN_AMOUNT_PHRASES = 1;
const MAX_AMOUNT_PHRASES = 5;
const YEARS_AGO_AMOUNT = 5;


export const getRandomDescriptions = () => {
  const sumStrings = [];
  const phrases = DESCRIPTIONS.split(`.`);

  for (let i = 0; i < getRandomInteger(MIN_AMOUNT_PHRASES, MAX_AMOUNT_PHRASES); i++) {
    sumStrings.push(phrases[getRandomIndexOfList(phrases)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPhoto = () => {
  const photo = {};
  const pictureTitle = pictureTitles[getRandomInteger(0, pictureTitles.length - 1)];
  photo.src = `./images/posters/${pictureTitle}`;
  photo.description = ``;

  return photo;
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

export const generateDate = () => {
  const yearsAgoAmount = getRandomInteger(0, YEARS_AGO_AMOUNT);
  return dayjs().subtract(yearsAgoAmount, `year`).toDate();
};
