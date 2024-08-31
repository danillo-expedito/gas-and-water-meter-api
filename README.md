# Water and Gas Consumption Management API

## Overview

This project is a backend service designed to manage individualized readings of water and gas consumption. The service leverages AI technology to extract measurements from meter images, providing an efficient and accurate solution for data collection and management. The API offers endpoints for image upload, reading confirmation, and retrieval of recorded measurements for specific customers.

## Features

- **Image Upload**: Receives a base64-encoded image, interacts with the Google Gemini API to extract the measurement, and returns the result.
- **Reading Confirmation**: Allows confirmation or correction of the extracted measurement, and saves the validated data in the database.
- **Measurement Retrieval**: Retrieves a list of all recorded measurements for a given customer, with optional filtering by measurement type (WATER/GAS).

## Technologies

- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Superset of JavaScript that compiles to plain JavaScript, offering type safety and enhanced tooling.
- **Express**: Web framework for Node.js to build RESTful APIs.
- **MySQL**: Relational database management system for storing data.
- **Sequelize**: Promise-based ORM for Node.js, used to interact with the MySQL database.
- **Google Gemini API**: AI service used for analyzing and extracting measurements from meter images.

## Ports

- **Backend Server**: Running on port `3001`
- **MySQL Database**: Accessible on port `3306`

## Getting Started

To start the project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Create a `.env` File**:
   You will need a GEMINI_API_KEY to use the Google Gemini API. Create a .env file in the root directory of the project with the following content:

   ```bash
   GEMINI_API_KEY=<your-gemini-api-key>

3. **Ensure Docker is Installed**: This project uses Docker for containerization. <br>
Please ensure Docker is installed and running on your machine.

4. **Start the Project**:
   
   ```bash
   npm run compose:up

This command will set up and start the required Docker containers.

## Endpoints
- **POST /upload**: Uploads a base64-encoded image, processes it using the Google Gemini API to extract the measurement, and returns the result.
- **PATCH /confirm**: Confirms or corrects the extracted measurement and updates the database with the validated data.
- **GET /<customer_code>/list**: Retrieves a list of all recorded measurements for the specified customer. Optional filter by measurement type (WATER/GAS) is supported.

## Error Handling
The API includes robust error handling to manage common scenarios such as:

- Duplicate readings
- Invalid data
- Unauthorized access

## Example Request (json)

    ```
    {
      "image": "base64",
      "customer_code": "string",
      "measure_datetime": "datetime",
      "measure_type": "WATER" | "GAS"
    }
    
## Notes
- Ensure that Docker is running before starting the project.
- The API uses Sequelize ORM to interact with the MySQL database.
- The PORT 3001 is used for the backend service, while the MySQL database is accessible on PORT 3306.

