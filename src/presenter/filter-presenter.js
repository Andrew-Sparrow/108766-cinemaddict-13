import FiltersView from "../view/filters-view";

import {
  remove,
  render,
  RenderPosition,
  replace,
} from "../utils/render-utils";

import {calculateFilmsInFilter} from "../utils/filter-utils";

import {
  MenuItem,
  UpdateTypeForRerender
} from "../utils/consts";

export default class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._currentFilter = null;

    this._filterComponent = null;

    this._handleFilterModelEvent = this._handleFilterModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleFilterModelEvent);
    this._filterModel.addObserver(this._handleFilterModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleFilterModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    if (filterType === MenuItem.STATS) {
      this._filterModel.setFilter(UpdateTypeForRerender.STATS, filterType);
    } else {
      this._filterModel.setFilter(UpdateTypeForRerender.MAJOR, filterType);
    }
  }

  _getFilters() {
    return calculateFilmsInFilter(this._filmsModel.getItems());
  }
}
