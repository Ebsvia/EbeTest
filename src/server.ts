import express from "express";
import { getAllCards } from "./controllers/cardsController";
import { getCardById } from "./controllers/cardController";

const router = express.Router();

router.get("/cards", getAllCards);
router.get("/cards/:cardId/:sizeId?", getCardById);

export default router;
