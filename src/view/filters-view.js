import Abstract from "./abstract";
import {FilterType} from "../utils/consts";

const createMainNavigationTemplate = (filters, currentFilterType) => {
  const {
    watchlist,
    history,
    favorites
  } = filters;

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all"
         data-filter-type="${FilterType.ALL}"
         class="main-navigation__item ${currentFilterType === FilterType.ALL ? `main-navigation__item--active` : ``}">
         All movies
      </a>
      <a href="#watchlist"
         data-filter-type="${FilterType.WATCHLIST}"
         class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}">
          Watchlist
         <span class="main-navigation__item-count">
           ${watchlist}
         </span>
      </a>
      <a href="#history"
         data-filter-type="${FilterType.HISTORY}"
         class="main-navigation__item" ${currentFilterType === FilterType.HISTORY ? `main-navigation__item--active` : ``}>
           History
        <span class="main-navigation__item-count">
          ${history}
        </span>
      </a>
      <a href="#favorites"
         data-filter-type="${FilterType.FAVORITES}"
         class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? `main-navigation__item--active` : ``}">
           Favorites
        <span class="main-navigation__item-count">
          ${favorites}
        </span>
      </a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class FiltersView extends Abstract {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
