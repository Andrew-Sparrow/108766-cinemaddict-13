import Observer from "./observer";
import {MenuItem} from "../utils/consts";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = MenuItem.ALL;
  }

  setFilter(updateTypeForRerender, filter) {
    this._activeFilter = filter;
    this._notify(updateTypeForRerender, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
