export const splitPath = (path, subLen = 0, char = '/') => {
  return decodeURIComponent(path).substring(subLen).split(char).filter(part => part !== '');
};

export const objectSorting = (obj) => {
  const sortedKey = Object.keys(obj).sort((a, b) => b.localeCompare(a));

  const res = sortedKey.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});

  return res;
}