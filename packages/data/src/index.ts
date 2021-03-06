/* eslint-disable @typescript-eslint/no-explicit-any */
const cache: {
  [key: string]: any;
} = {};

export const get = <T = any>(key: string): T => cache[key];

export const set = (key: string, value: any): void => {
  cache[key] = value;
};

export const getAsync = <T = any>(key: string): Promise<T> =>
  new Promise((resolve, reject) => {
    const res = cache[key];
    if (res) {
      resolve(res);
    }
    reject(new Error(`Cache: key: ${key} not found`));
  });

export default {
  get,
  getAsync,
  set,
};
