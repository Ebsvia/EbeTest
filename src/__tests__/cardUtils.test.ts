import { calculatePrice, transformPages } from "../utils/cardUtils";

describe("calculatePrice", () => {
  it("should return the correct price formatted in pounds", () => {
    const basePrice = 1000; // 1000 pence = £10.00
    const priceMultiplier = 1.5;
    const result = calculatePrice(basePrice, priceMultiplier);
    expect(result).toBe("£15.00");
  });

  it("should handle a base price of 0", () => {
    const basePrice = 0;
    const priceMultiplier = 1;
    const result = calculatePrice(basePrice, priceMultiplier);
    expect(result).toBe("£0.00");
  });

  it("should handle a price multiplier of 1", () => {
    const basePrice = 2500; // 2500 pence = £25.00
    const priceMultiplier = 1;
    const result = calculatePrice(basePrice, priceMultiplier);
    expect(result).toBe("£25.00");
  });

  it("should handle small fractional multipliers", () => {
    const basePrice = 1000; // 1000 pence = £10.00
    const priceMultiplier = 0.25;
    const result = calculatePrice(basePrice, priceMultiplier);
    expect(result).toBe("£2.50");
  });
});

describe("transformPages", () => {
  const mockTemplates = [
    { id: "template001", imageUrl: "/front-cover.jpg" },
    { id: "template002", imageUrl: "/back-cover.jpg" },
  ];

  it("should return transformed pages with correct imageUrls from templates", () => {
    const mockPages = [
      {
        title: "Front Page",
        templateId: "template001",
        width: 200,
        height: 300,
      },
      {
        title: "Back Page",
        templateId: "template002",
        width: 200,
        height: 300,
      },
    ];

    const result = transformPages(mockPages, mockTemplates);

    expect(result).toEqual([
      {
        title: "Front Page",
        width: 200,
        height: 300,
        imageUrl: "/front-cover.jpg",
      },
      {
        title: "Back Page",
        width: 200,
        height: 300,
        imageUrl: "/back-cover.jpg",
      },
    ]);
  });

  it("should return an empty imageUrl if the templateId is not found", () => {
    const mockPages = [
      {
        title: "Unknown Page",
        templateId: "template999",
        width: 200,
        height: 300,
      },
    ];

    const result = transformPages(mockPages, mockTemplates);

    expect(result).toEqual([
      {
        title: "Unknown Page",
        width: 200,
        height: 300,
        imageUrl: "",
      },
    ]);
  });

  it("should handle an empty pages array", () => {
    const mockPages: any[] = [];

    const result = transformPages(mockPages, mockTemplates);

    expect(result).toEqual([]);
  });

  it("should handle an empty templates array", () => {
    const mockPages = [
      {
        title: "Front Page",
        templateId: "template001",
        width: 200,
        height: 300,
      },
    ];

    const result = transformPages(mockPages, []);

    expect(result).toEqual([
      {
        title: "Front Page",
        width: 200,
        height: 300,
        imageUrl: "",
      },
    ]);
  });
});
