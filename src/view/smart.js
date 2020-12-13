import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._film = {};
  }

  updateData(updatedData, justDataUpdating) {
    if (!updatedData) {
      return;
    }

    this._film = Object.assign(
        {},
        this._film,
        updatedData
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
