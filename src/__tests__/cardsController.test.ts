import request from "supertest";
import app from "../index"; 
import { fetchCards, fetchTemplates } from "../services/dataService";

// Mock services
jest.mock("../services/dataService");

describe("GET /cards", () => {
  const mockCards = [
    {
      id: "card001",
      title: "Card 1",
      pages: [{ templateId: "template001" }],
    },
    {
      id: "card002",
      title: "Card 2",
      pages: [{ templateId: "template002" }],
    },
  ];

  const mockTemplates = [
    { id: "template001", imageUrl: "/front-cover-1.jpg" },
    { id: "template002", imageUrl: "/front-cover-2.jpg" },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should return a list of cards", async () => {
    (fetchCards as jest.Mock).mockResolvedValue(mockCards);
    (fetchTemplates as jest.Mock).mockResolvedValue(mockTemplates);

    const res = await request(app).get("/cards");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2); // Two cards in the mock data
    expect(res.body[0].title).toEqual("Card 1");
    expect(res.body[0].imageUrl).toEqual("/front-cover-1.jpg");
    expect(res.body[1].title).toEqual("Card 2");
    expect(res.body[1].imageUrl).toEqual("/front-cover-2.jpg");
  });

  it("should return 500 if there is an error fetching cards", async () => {
    (fetchCards as jest.Mock).mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).get("/cards");

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: "Error fetching card data" });
  });
});
