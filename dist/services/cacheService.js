"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = exports.setCache = void 0;
const cache = {};
const CACHE_DURATION = 60 * 1000; // Cache duration in milliseconds (1 minute)
const setCache = (key, data) => {
    const expiry = Date.now() + CACHE_DURATION;
    cache[key] = { data, expiry };
};
exports.setCache = setCache;
const getCache = (key) => {
    const cachedItem = cache[key];
    if (cachedItem && cachedItem.expiry > Date.now()) {
        return cachedItem.data;
    }
    return null;
};
exports.getCache = getCache;
