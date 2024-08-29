# Water and Gas Consumption Management API #

This project is a backend service designed to manage individualized readings of water and gas consumption. The service utilizes AI to extract measurements from meter images, providing an efficient solution for data collection. The backedn offers endpoints for image upload, reading confirmation, and retrieval of recorded measurements for specific customers.

Endpoints:

POST /upload: Receives a base64 image, interacts with Google Gemini API to extract the measurement, and returns the result.
PATCH /confirm: Confirms or corrects the extracted measurement, saving the validated data in the database.
GET /<customer_code>/list: Retrieves a list of all recorded measurements for a given customer, with optional filtering by measure type (WATER/GAS).

Technologies: Node.js, TypeScript, Express, Google Gemini API.

# The project includes error handling for common scenarios such as duplicate readings and invalid data.
