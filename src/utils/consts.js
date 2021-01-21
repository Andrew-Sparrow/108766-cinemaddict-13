export const FILMS_COUNT_PER_STEP = 5;

export const AMOUNT_OF_LETTERS = 140;

export const SHOW_TIME = 5000;

export const MAX_AMOUNT_WATCHED_FILMS_NOVICE = 10;

export const MAX_AMOUNT_WATCHED_FILMS_FAN = 20;

export const BASE = 10; // the base in mathematical numeral systems

export const MINUTES_IN_HOUR = 60;

export const ENTER_KEY_CODE = 13;

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

export const UserActionForModel = {
  ADD_ITEM: `ADD_ITEM`,
  DELETE_ITEM: `DELETE_ITEM`,
  UPDATE_ITEM: `UPDATE_ITEM`,
  UPDATE_COMMENTS: `UPDATE_COMMENTS`
};

export const UpdateTypeForRerender = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  INIT_OFFLINE: `INIT_OFFLINE`
};

export const MenuItem = {
  ALL: `ALL`,
  WATCHLIST: `WATCHLIST`,
  HISTORY: `HISTORY`,
  FAVORITES: `FAVORITES`,
  STATS: `STATS`
};

export const BLANK_COMMENT = {
  id: null,
  text: ``,
  emotion: null,
  author: ``,
  date: null,
};

export const UserRanks = {
  NO_RANK: `No rank`,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

export const StatisticsMenuItem = {
  ALL: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`
};

export const StatisticsAmountDays = {
  WEEK: 6,
  MONTH: 30,
  YEAR: 365
};

export const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};
