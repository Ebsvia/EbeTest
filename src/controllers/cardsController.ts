import { Request, Response } from 'express';
import { fetchCards, fetchTemplates } from '../services/dataService';

export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await fetchCards();
    const templates = await fetchTemplates();

    const cardList = cards.map((card: any) => {
      const firstPage = card.pages[0];
      const template = templates.find((t: any) => t.id === firstPage.templateId);
      return {
        title: card.title,
        imageUrl: template ? template.imageUrl : '',
        url: `/cards/${card.id}`,
      };
    });

    res.json(cardList);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching card data' });
  }
};
