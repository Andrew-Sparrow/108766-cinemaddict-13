import Observer from "../utils/observer";

export default class FilmsModel extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, updatedItem) {
    const index = this._films.findIndex((film) => film.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Cant't update nonexistent film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      updatedItem,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, updatedItem);
  }
}
