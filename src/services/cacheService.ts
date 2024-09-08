const cache: { [key: string]: { data: any; expiry: number } } = {};

const CACHE_DURATION = 60 * 1000; // Cache duration in milliseconds (1 minute)

export const setCache = (key: string, data: any) => {
  const expiry = Date.now() + CACHE_DURATION;
  cache[key] = { data, expiry };
};

export const getCache = (key: string): any | null => {
  const cachedItem = cache[key];
  if (cachedItem && cachedItem.expiry > Date.now()) {
    return cachedItem.data;
  }
  return null;
};
