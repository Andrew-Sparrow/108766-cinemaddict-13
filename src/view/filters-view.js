import Abstract from "./abstract";
import {MenuItem} from "../utils/consts";

const createMainNavigationTemplate = (filteredFilms, currentFilterType) => {
  const {
    WATCHLIST,
    HISTORY,
    FAVORITES
  } = filteredFilms;

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all"
         data-filter-type="${MenuItem.ALL}"
         class="main-navigation__item ${currentFilterType === MenuItem.ALL ? `main-navigation__item--active` : ``}">
           All movies
      </a>
      <a href="#watchlist"
         data-filter-type="${MenuItem.WATCHLIST}"
         class="main-navigation__item ${currentFilterType === MenuItem.WATCHLIST ? `main-navigation__item--active` : ``}">
           Watchlist
         <span class="main-navigation__item-count">
           ${WATCHLIST.length}
         </span>
      </a>
      <a href="#history"
         data-filter-type="${MenuItem.HISTORY}"
         class="main-navigation__item ${currentFilterType === MenuItem.HISTORY ? `main-navigation__item--active` : ``}">
           History
        <span class="main-navigation__item-count">
          ${HISTORY.length}
        </span>
      </a>
      <a href="#favorites"
         data-filter-type="${MenuItem.FAVORITES}"
         class="main-navigation__item ${currentFilterType === MenuItem.FAVORITES ? `main-navigation__item--active` : ``}">
           Favorites
        <span class="main-navigation__item-count">
          ${FAVORITES.length}
        </span>
      </a>
    </div>
    <a href="#stats"
       data-filter-type="${MenuItem.STATS}"
       class="main-navigation__additional ${currentFilterType === MenuItem.STATS ? `main-navigation__item--active` : ``}">Stats</a>
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
    if (evt.target.classList.contains(`main-navigation__item`)) {
      this._callback.filterTypeChange(evt.target.dataset.filterType);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
