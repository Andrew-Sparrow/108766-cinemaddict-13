import FilmCardView from "../view/film-card-view";
import PopupView from "../view/popup-view";
import Abstract from "../view/abstract";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, child, place) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
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

  popupComponent.getFilmDetailsCloseButtonComponent().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(popupComponent.getElement());
    popupComponent.removeElement();
  });

  render(document.body, popupComponent.getElement(), RenderPosition.BEFOREEND);
};

export const renderFilmCard = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);

  filmCardComponent.setCardPosterClickHandler(() => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  filmCardComponent.setCardTitleClickHandler(() => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  filmCardComponent.setCardCommentsClickHandler(() => {
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};
