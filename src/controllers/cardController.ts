import { Request, Response } from "express";
import {
  fetchCards,
  fetchSizes,
  fetchTemplates,
} from "../services/dataService";

export const getCardById = async (req: Request, res: Response) => {
  const { cardId, sizeId } = req.params;

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
    console.log("sizeId:", sizeId); // Log the sizeId being passed
    console.log("sizes:", sizes); // Log the available sizes

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

    res.json({
      title: card.title,
      size: sizeId || "default",
      availableSizes,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching card data" });
  }
};
