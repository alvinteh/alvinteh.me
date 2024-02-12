const setPageTitle = (title: string): void => {
  const newTitle: string = title ? `${title} | Alvin Teh` : 'Alvin Teh';

  document.title = newTitle;
  document.getElementById('meta-og-title')?.setAttribute('content', newTitle);
};

const setPageMeta = ({ description, image }: {description?: string, image?: string }): void => {
  if (description) {
    document.getElementById('meta-desc')?.setAttribute('content', description);
    document.getElementById('meta-og-desc')?.setAttribute('content', description);
  }

  if (image) {
    document.getElementById('meta-og-image')?.setAttribute('content',
      `${window.location.protocol}//${window.location.host}${image}`);
  }
};

export {
  setPageMeta,
  setPageTitle,
};