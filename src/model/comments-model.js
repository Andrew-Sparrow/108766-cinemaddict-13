import Observer from "./observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  setItems(rerenderType, items) {
    this._items = items.slice();

    this._notify(rerenderType);
  }

  getItems() {
    return this._items;
  }

  addItem(rerenderType, updatedItem) {
    this._items = [
      ...this._items,
      updatedItem
    ];

    this._notify(rerenderType);
  }

  deleteItem(rerenderType, updatedItem) {
    this._items = this._items.filter((comment) => {
      return parseInt(comment.id, 10) !== parseInt(updatedItem, 10);
    });

    this._notify(rerenderType);
  }

  static adaptToClient(commentFromServer) {
    const adaptedCommentForClient = Object.assign(
        {},
        commentFromServer,
        {
          text: commentFromServer.comment,
          date: new Date(commentFromServer.date)
        }
    );

    delete adaptedCommentForClient.comment;

    return adaptedCommentForClient;
  }

  static adaptToServer(commentFromClient) {
    const adaptedCommentForClient = Object.assign(
        {},
        commentFromClient,
        {
          text: commentFromClient.comment,
          date: commentFromClient.date.toISOString
        }
    );

    delete adaptedCommentForClient.comment;
    delete adaptedCommentForClient.id;
    delete adaptedCommentForClient.author;

    return adaptedCommentForClient;
  }
}
