"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardById = void 0;
const dataService_1 = require("../services/dataService");
const cardUtils_1 = require("../utils/cardUtils");
const getCardById = async (req, res) => {
    const { cardId, sizeId } = req.params;
    try {
        const [cards, sizes, templates] = await Promise.all([
            (0, dataService_1.fetchCards)(),
            (0, dataService_1.fetchSizes)(),
            (0, dataService_1.fetchTemplates)(),
        ]);
        const card = cards.find((c) => c.id === cardId);
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }
        console.log("sizeId:", sizeId); // Log the sizeId being passed
        console.log("sizes:", sizes); // Log the available sizes
        if (sizeId) {
            const validSize = sizes.find((s) => s.id === sizeId);
            if (!validSize) {
                return res.status(400).json({ error: `Invalid sizeId: ${sizeId}` });
            }
        }
        const availableSizes = sizes.map((size) => ({
            id: size.id,
            title: size.title,
        }));
        const size = sizes.find((s) => s.id === sizeId);
        const priceMultiplier = size ? size.priceMultiplier : 1;
        const price = (0, cardUtils_1.calculatePrice)(card.basePrice, priceMultiplier);
        const pages = (0, cardUtils_1.transformPages)(card.pages, templates);
        res.json({
            title: card.title,
            size: sizeId || "default",
            availableSizes,
            imageUrl: pages[0].imageUrl,
            price,
            pages,
        });
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching card data" });
    }
};
exports.getCardById = getCardById;
