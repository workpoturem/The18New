export const keyMirror = (arr, prefix) => {
  const arrReduced = arr.reduce((obj, key) => {
    obj[key] = prefix + key;
    return obj;
  }, {});

  return arrReduced;
};
