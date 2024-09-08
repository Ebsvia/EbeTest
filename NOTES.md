Separation of Concern

src/ - Contains all source code.
    controllers - Contains the logic for handling API requests.
    services- Contains services for interacting with data sources.
    utils - Utility functions.
   index.ts - Entry point of the application.
   server.ts - Routes
   package.json - Project metadata and dependencies.
   tsconfig.json - TypeScript configuration


This project provides a simple REST API with two endpoints that serve card information from static JSON files. The /cards endpoint returns a list of available cards, while the /cards/:cardId/:sizeId? endpoint returns detailed information for a specific card, including price calculations based on the card's size.

Key Decisions and Design Choices

Modular Structure: The code is organised into multiple modules to enhance maintainability and scalability:

Controllers: Handle request and response logic for specific routes.
Services: Responsible for fetching data from external sources.
Utils: Provide helper functions for operations like price calculations and transforming card data.
Cache Service: Implements a basic in-memory caching mechanism to reduce repeated external API requests, which is particularly useful when the same data is frequently requested.
Error Handling: I implemented basic error handling for the following scenarios:

Card Not Found: If the cardId does not exist, the API returns a 404 Not Found error.
Invalid sizeId: If an invalid sizeId is provided, the API returns a 400 Bad Request with an appropriate error message.
General API Errors: Any internal issues while fetching data result in a 500 Internal Server Error.
Caching: The in-memory caching system, implemented in a cacheService.ts file, stores card, size, and template data for 1 minute. This reduces the number of external requests and improves performance, simulating a real-world caching strategy.

Size-Based Price Calculation: The price is calculated by multiplying the basePrice of a card by the priceMultiplier of the selected size. If no size is provided, the base price is returned.

TypeScript: I used TypeScript to ensure type safety and improve the development experience. It helps catch type-related issues early and enhances code readability.

Testing Strategy
Unit and Integration Tests: Using Jest and Supertest, I wrote tests for key features:

The tests aim to validate the functionality and robustness of the API endpoints and utility functions in the card service.

 /cards/:cardId Endpoint Tests
These tests ensure the correct behaviour when fetching details for a specific card:
Valid card and size: Confirms the API returns correct card details, including title, size, image URL, and price, when valid cardId and sizeId are provided.
Invalid sizeId: Checks that an invalid sizeId results in a 400 Bad Request with a clear error message.
Card not found: Ensures that a non-existent cardId triggers a 404 Not Found response.

 /cards Endpoint Tests
These tests check the behaviour when fetching a list of cards:
Successful response: Verifies that the API returns a list of cards with correct titles and image URLs.
Error fetching cards: Shows an error during the card-fetching process and ensures the API returns a 500 Internal Server Error.

calculatePrice Utility Function Tests
These tests focus on the price calculation logic:
Correct price calculation: Ensures prices are calculated correctly and formatted in pounds.
Zero base price: Confirms the function handles a base price of £0 correctly.
Multiplier handling: Checks that the function works with different price multipliers, including small fractional values.

transformPages Utility Function Tests
These tests validate the transformation of page data:
Successful transformation: Confirms that pages are correctly matched with template image URLs.
Missing template: Ensures that pages without a matching template return an empty image URL.
Empty inputs: Checks that the function handles empty pages or templates gracefully.

Future Improvements
Given more time, I would consider the following enhancements:

Better Error Handling: I would implement linting for consistent syntax and would add more detailed error messages (e.g., differentiating between network errors and server-side issues). Custom error classes could also improve error management.

Caching Improvements: In-memory caching is limited in production environments. I would replace it with a more scalable solution, such as Redis, to handle larger-scale caching needs.

Data Validation: I would implement more robust validation for input data, using libraries like Joi or express-validator to ensure the validity and proper formatting of cardId and sizeId.

Pagination and Filtering: To handle large datasets more efficiently, I would introduce pagination and filtering options for the /cards endpoint.

Additional Testing: I would increase test coverage to include edge cases and boundary conditions (e.g., handling large datasets, edge cases for price calculations, and empty responses). Performance testing would also help assess the impact of caching and external requests.

Deployment Setup: With more time, I would add a Docker configuration and prepare the app for deployment to a cloud environment, including environment-specific configurations for development, testing, and production stages.

Unfinished or Missing Features
User Authentication: As the task focused on backend API functionality, user authentication or authorisation was not implemented. In a future iteration, I would introduce a basic authentication mechanism, such as JWT or OAuth, to secure certain endpoints.

Detailed Logging: While basic error logging is present, I would integrate a more advanced logging solution, such as Winston or Morgan, for tracking requests, errors, and application performance, particularly in production environments.

Final Thoughts
My focus was on ensuring modularity, effective error handling, and efficient caching to build a clean, maintainable, and performant solution. Although some features and optimisations remain unfinished due to time constraints, the project provides a solid foundation for future enhancements and scalability.