import Observer from "./observer";
import {FilterType} from "../utils/consts";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateTypeForRerender, filter) {
    this._activeFilter = filter;
    this._notify(updateTypeForRerender, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
