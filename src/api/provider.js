import FilmsModel from "../model/films-model";
import {isOnline} from "../utils/common-utils";

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(storeTasks.map(FilmsModel.adaptToClient));
  }

  updateTask(film) {
    if (isOnline()) {
      return this._api.updateTask(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  addFilm(film) {
    if (isOnline()) {
      return this._api.addFilm(film)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, FilmsModel.adaptToServer(newFilm));
          return newFilm;
        });
    }

    return Promise.reject(new Error(`Add task failed`));
  }

  deleteFilm(film) {
    if (isOnline()) {
      return this._api.deleteFilm(film)
        .then(() => this._store.removeItem(film.id));
    }

    return Promise.reject(new Error(`Delete film failed`));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdTasks = getSyncedFilms(response.created);
          const updatedTasks = getSyncedFilms(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdTasks, ...updatedTasks]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
