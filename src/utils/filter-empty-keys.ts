export const filterEmptyKeys = (obj: Record<string, unknown>) =>
  Object.keys(obj).reduce((res, key) => {
    if (obj[key] !== undefined && obj[key] !== null) res[key] = obj[key];
    return res;
  }, {});
