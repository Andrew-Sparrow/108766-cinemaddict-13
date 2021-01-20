import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const scrollTopValue = prevElement.scrollTop;

    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    newElement.scrollTop = scrollTopValue;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
