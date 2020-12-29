import Observer from "./observer";
import {collectionOfComments} from "../presenter/board-presenter";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  setItems(items) {
    this._items = items.slice();
  }

  getItems() {
    return this._items;
  }

  addItem(updateType, updatedItem) {
    this._items = [
      updatedItem,
      ...this._items
    ];

    this._notify(updateType, updatedItem);
  }

  deleteItem(updatedItem) {
    this._items = this._items.filter((commentID) => commentID !== updatedItem);
    collectionOfComments.delete(updatedItem);

    this._notify();
  }
}
