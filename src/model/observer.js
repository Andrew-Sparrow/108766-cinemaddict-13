export default class Observer {
  constructor() {
    this._obsevers = [];
  }

  addObserver(observer) {
    this._obsevers.push(observer);
  }

  removeObserver(observer) {
    this._obsevers = this._obsevers.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, payload) {
    this._obsevers.forEach((observer) => observer(event, payload));
  }
}
