import { Request, Response } from "express";
import {
  fetchCards,
  fetchSizes,
  fetchTemplates,
} from "../services/dataService";
import { calculatePrice, transformPages } from "../utils/cardUtils";

export const getCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const { sizeId } = req.query; // Get sizeId from query parameters

  try {
    const [cards, sizes, templates] = await Promise.all([
      fetchCards(),
      fetchSizes(),
      fetchTemplates(),
    ]);

    const card = cards.find((c: any) => c.id === cardId);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    console.log("sizeId:", sizeId); // Log sizeId for debugging
    console.log("sizes:", sizes);   // Log sizes for debugging

    if (sizeId) {
      const validSize = sizes.find((s: any) => s.id === sizeId);
      if (!validSize) {
        return res.status(400).json({ error: `Invalid sizeId: ${sizeId}` });
      }
    }

    const availableSizes = sizes.map((size: any) => ({
      id: size.id,
      title: size.title,
    }));

    const size = sizes.find((s: any) => s.id === sizeId);
    const priceMultiplier = size ? size.priceMultiplier : 1;
    const price = calculatePrice(card.basePrice, priceMultiplier);
    const pages = transformPages(card.pages, templates);

    res.json({
      title: card.title,
      size: sizeId || "default",
      availableSizes,
      imageUrl: pages[0].imageUrl,
      price,
      pages,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching card data" });
  }
};
