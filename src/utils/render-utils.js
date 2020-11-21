export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}
