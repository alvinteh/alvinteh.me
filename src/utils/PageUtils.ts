const setPageTitle = (title: string): void => {
  document.title = title ? `${title} | Alvin Teh` : 'Alvin Teh';
};

export {
  setPageTitle,
}