import request from 'supertest';
import app from '../index';
import { fetchCards, fetchSizes, fetchTemplates } from '../services/dataService';
import { calculatePrice, transformPages } from '../utils/cardUtils';

// Mock services and utils
jest.mock('../services/dataService');
jest.mock('../utils/cardUtils');

describe('GET /cards/:cardId', () => {
  const mockCards = [
    {
      id: 'card001',
      title: 'Card 1',
      basePrice: 1000,
      pages: [{ templateId: 'template001' }]
    }
  ];

  const mockSizes = [
    { id: 'size001', title: 'Small', priceMultiplier: 1 },
    { id: 'size002', title: 'Large', priceMultiplier: 1.5 }
  ];

  const mockTemplates = [{ id: 'template001', imageUrl: '/front-cover.jpg' }];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return card details successfully when valid cardId and sizeId are provided', async () => {
    (fetchCards as jest.Mock).mockResolvedValue(mockCards);
    (fetchSizes as jest.Mock).mockResolvedValue(mockSizes);
    (fetchTemplates as jest.Mock).mockResolvedValue(mockTemplates);
    (calculatePrice as jest.Mock).mockReturnValue('£15.00');
    (transformPages as jest.Mock).mockReturnValue([{ imageUrl: '/front-cover.jpg' }]);

    // Sending sizeId as query parameter
    const res = await request(app).get('/cards/card001?sizeId=size002');

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Card 1');
    expect(res.body.size).toEqual('size002');
    expect(res.body.availableSizes.length).toBe(2); // Small and Large sizes
    expect(res.body.imageUrl).toEqual('/front-cover.jpg');
    expect(res.body.price).toEqual('£15.00');
  });

  it('should return 400 for an invalid sizeId', async () => {
    (fetchCards as jest.Mock).mockResolvedValue(mockCards);
    (fetchSizes as jest.Mock).mockResolvedValue(mockSizes);
    (fetchTemplates as jest.Mock).mockResolvedValue(mockTemplates);

    const res = await request(app).get('/cards/card001?sizeId=invalidSize'); // Passing invalid sizeId

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid sizeId: invalidSize' });
  });

  it('should return 404 if card is not found', async () => {
    (fetchCards as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get('/cards/nonexistent-card');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'Card not found' });
  });
});
