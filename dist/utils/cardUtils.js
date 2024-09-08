"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPages = exports.calculatePrice = void 0;
const calculatePrice = (basePrice, priceMultiplier) => {
    const priceInPence = basePrice * priceMultiplier;
    return `£${(priceInPence / 100).toFixed(2)}`;
};
exports.calculatePrice = calculatePrice;
const transformPages = (pages, templates) => {
    return pages.map((page) => {
        const template = templates.find((t) => t.id === page.templateId);
        return {
            title: page.title,
            width: page.width,
            height: page.height,
            imageUrl: template ? template.imageUrl : '',
        };
    });
};
exports.transformPages = transformPages;
