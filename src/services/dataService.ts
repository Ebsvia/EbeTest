import fetch from 'node-fetch';
import { getCache, setCache } from './cacheService';

const CARDS_URL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';
const SIZES_URL = 'https://moonpig.github.io/tech-test-node-backend/sizes.json';
const TEMPLATES_URL = 'https://moonpig.github.io/tech-test-node-backend/templates.json';

const fetchJson = async (url: string, cacheKey: string) => {
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}`);
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
};

export const fetchCards = () => fetchJson(CARDS_URL, 'cards');
export const fetchSizes = () => fetchJson(SIZES_URL, 'sizes');
export const fetchTemplates = () => fetchJson(TEMPLATES_URL, 'templates');
