export const calculatePrice = (basePrice: number, priceMultiplier: number): string => {
    const priceInPence = basePrice * priceMultiplier;
    return `£${(priceInPence / 100).toFixed(2)}`;
  };
  
  export const transformPages = (pages: any[], templates: any[]): any[] => {
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
  