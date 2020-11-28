import FilmCardView from "../view/film-card-view";
import PopupView from "../view/popup-view";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderPopup = (film) => {
  const popupComponent = new PopupView(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      document.body.removeChild(popupComponent.getElement());
      popupComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(popupComponent.getElement());
    popupComponent.removeElement();
  });

  render(document.body, popupComponent.getElement(), RenderPosition.BEFOREEND);
};

export const renderFilmCard = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};
