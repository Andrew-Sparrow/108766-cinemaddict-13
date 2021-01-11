import Observer from "./observer";

export default class FilmsModel extends Observer {
  constructor() {
    super();

    this._items = [];
  }

  setItems(updateTypeForRerender, items) {
    this._items = items.slice();

    this._notify(updateTypeForRerender);
  }

  getItems() {
    return this._items;
  }

  updateItems(updateType, updatedItem) {
    const index = this._items.findIndex((item) => item.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Cant't update nonexistent item`);
    }

    this._items = [
      ...this._items.slice(0, index),
      updatedItem,
      ...this._items.slice(index + 1)
    ];

    this._notify(updateType, updatedItem);
  }

  static adaptToClient(filmFromServer) {
    const adaptedFilmForClient = Object.assign(
        {},
        filmFromServer,
        {
          id: filmFromServer.id,
          poster: Object.assign(
              {},
              {
                src: filmFromServer.film_info.poster,
                description: `poster of movie`
              }),
          title: filmFromServer.film_info.title,
          originalTitle: filmFromServer.film_info.alternative_title,
          rating: filmFromServer.film_info.total_rating,
          director: filmFromServer.film_info.director,
          screenwriters: filmFromServer.film_info.writers,
          actors: filmFromServer.film_info.actors,
          releaseDate: new Date(filmFromServer.film_info.release.date),
          duration: filmFromServer.film_info.runtime,
          country: filmFromServer.film_info.release.release_country,
          genres: filmFromServer.film_info.genre,
          description: filmFromServer.film_info.description,
          ageRating: filmFromServer.film_info.age_rating,
          comments: filmFromServer.comments,
          isFavorite: filmFromServer.user_details.favorite,
          isInWatchlist: filmFromServer.user_details.watchlist,
          isWatched: filmFromServer.user_details.already_watched,
          watchingDate: filmFromServer.user_details.watching_date,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilmForClient.film_info;
    delete adaptedFilmForClient.user_details;

    return adaptedFilmForClient;
  }

  static adaptToServer(filmFromClient) {
    const filmInfoForServer = Object.assign(
        {},
        {
          "title": filmFromClient.title,
          "alternative_title": filmFromClient.originalTitle,
          "total_rating": filmFromClient.rating,
          "poster": filmFromClient.poster.src,
          "age_rating": filmFromClient.ageRating,
          "director": filmFromClient.director,
          "writers": filmFromClient.screenwriters,
          "actors": filmFromClient.actors,
          "release": Object.assign(
              {},
              {
                "date": filmFromClient.releaseDate.toISOString(),
                "release_country": filmFromClient.country
              }
          ),
          "runtime": filmFromClient.duration,
          "genre": filmFromClient.genres,
          "description": filmFromClient.description
        }
    );

    const userDetailsForServer = Object.assign(
        {},
        {
          "watchlist": filmFromClient.isInWatchlist,
          "already_watched": filmFromClient.isWatched,
          "watching_date": filmFromClient.watchingDate,
          "favorite": filmFromClient.isFavorite
        }
    );

    const adaptedFilmForServer = Object.assign(
        {},
        {
          "id": filmFromClient.id,
          "comments": filmFromClient.comments,
          "film_info": filmInfoForServer,
          "user_details": userDetailsForServer
        }
    );

    return adaptedFilmForServer;
  }
}
