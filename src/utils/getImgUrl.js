const getImgUrl = (imgName) => {
  return new URL(`../assets/books/${imgName}`, import.meta.url);
};

export { getImgUrl };
