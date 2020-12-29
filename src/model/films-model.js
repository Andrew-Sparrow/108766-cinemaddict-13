import Observer from "./observer";

export default class FilmsModel extends Observer {
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
}
