"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardsController_1 = require("./controllers/cardsController");
const cardController_1 = require("./controllers/cardController");
const router = express_1.default.Router();
router.get("/cards", cardsController_1.getAllCards);
router.get("/cards/:cardId/:sizeId?", cardController_1.getCardById);
exports.default = router;
