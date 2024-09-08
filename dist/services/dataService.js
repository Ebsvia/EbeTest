"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTemplates = exports.fetchSizes = exports.fetchCards = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cacheService_1 = require("./cacheService");
const CARDS_URL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';
const SIZES_URL = 'https://moonpig.github.io/tech-test-node-backend/sizes.json';
const TEMPLATES_URL = 'https://moonpig.github.io/tech-test-node-backend/templates.json';
const fetchJson = async (url, cacheKey) => {
    const cachedData = (0, cacheService_1.getCache)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const response = await (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
    }
    const data = await response.json();
    (0, cacheService_1.setCache)(cacheKey, data);
    return data;
};
const fetchCards = () => fetchJson(CARDS_URL, 'cards');
exports.fetchCards = fetchCards;
const fetchSizes = () => fetchJson(SIZES_URL, 'sizes');
exports.fetchSizes = fetchSizes;
const fetchTemplates = () => fetchJson(TEMPLATES_URL, 'templates');
exports.fetchTemplates = fetchTemplates;
