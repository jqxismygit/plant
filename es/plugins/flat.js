const flat = {
  transformAllIds: list => list,
  transformById: (list, dataKey = 'id') => list && list.reduce((prev, c) => {
    if (c && (c === null || c === void 0 ? void 0 : c[dataKey])) {
      prev[c[dataKey]] = c;
    }

    return prev;
  }, {})
};
export default flat;