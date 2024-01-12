const getElementTranslation = (element: HTMLElement): [number, number, number] => {
  if (!element.style.transform) {
    return [0, 0, 0];
  }

  const translates: number[] = element.style.transform.split(/\w+\(|\);?/)[1].split(/,\s?/g)
    .map((s: string) => { return Number.parseFloat(s.replace('px', '')); });

  return [translates[0], translates[1], translates[2]];
};

const setElementTranslation = (element: HTMLElement, { x, y, z }: { x?: number, y?: number, z?: number }): void => {
  const translates: number[] = getElementTranslation(element);

  if (x) {
    translates[0] = x;
  }
  if (y) {
    translates[1] = y;
  }
  if (z) {
    translates[2] = z;
  }

  element.style.transform = `translate3d(${translates[0]}px, ${translates[1]}px, ${translates[2]}px)`
};

export {
  getElementTranslation,
  setElementTranslation
};