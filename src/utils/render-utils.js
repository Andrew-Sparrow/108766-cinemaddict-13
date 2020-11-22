export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
