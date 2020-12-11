import { Plugin } from '../types';

const flat: Plugin = {
  transformAllIds: (list) => list,
  transformById: (list, dataKey = 'id') =>
    list &&
    list.reduce((prev, c) => {
      if (c && c?.[dataKey]) {
        prev[c[dataKey]] = c;
      }
      return prev;
    }, {}),
};

export default flat;
