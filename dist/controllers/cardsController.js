"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCards = void 0;
const dataService_1 = require("../services/dataService");
const getAllCards = async (req, res) => {
    try {
        const cards = await (0, dataService_1.fetchCards)();
        const templates = await (0, dataService_1.fetchTemplates)();
        const cardList = cards.map((card) => {
            const firstPage = card.pages[0];
            const template = templates.find((t) => t.id === firstPage.templateId);
            return {
                title: card.title,
                imageUrl: template ? template.imageUrl : '',
                url: `/cards/${card.id}`,
            };
        });
        res.json(cardList);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching card data' });
    }
};
exports.getAllCards = getAllCards;
