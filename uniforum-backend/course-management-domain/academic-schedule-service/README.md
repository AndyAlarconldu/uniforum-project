# 📅 UniForum - Academic Schedule Service

This microservice handles the creation, retrieval, updating, and deletion of academic course schedules. It is built using **Node.js**, **Express**, and **PostgreSQL**, and is part of the UniForum backend system.

---

## 📁 Project Structure
```
academic-schedule-service/
├── src/
│ ├── controllers/
│ │ └── schedule.controller.js # Request handlers for routes
│ ├── db/
│ │ └── index.js # PostgreSQL connection pool
│ ├── models/
│ │ └── schedule.model.js # Database queries and logic
│ ├── routes/
│ │ └── schedule.routes.js # API route definitions
│ └── app.js # Express app config and middleware
├── docker-compose.yml # Docker multi-service definition
├── Dockerfile # Docker image for schedule service
├── package.json # Project metadata and scripts
├── package-lock.json # Dependency lock file
├── server.js # Entry point to run the service
├── swagger.yaml # OpenAPI spec for documentation
└── README.md # Microservice documentation
```

---

## 🚀 Main Endpoints

| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| GET    | `/api/schedules`    | Get all schedules          |
| GET    | `/api/schedules/:id`| Get schedule by ID         |
| POST   | `/api/schedules`    | Create a new schedule      |
| PUT    | `/api/schedules/:id`| Update an existing schedule|
| DELETE | `/api/schedules/:id`| Delete a schedule          |

---

## 🐳 How to Run with Docker

### 1. Make sure you have Docker and Docker Compose installed.

### 2. Run the microservice with:

```bash
docker-compose up --build

This will build and start the service along with a PostgreSQL database.

The service will be accessible at:
📍 http://localhost:3000/api/schedules

🔧 Technologies Used
Node.js 18

Express.js

PostgreSQL

pg (Node PostgreSQL client)

Docker

Swagger (OpenAPI)

📖 API Documentation
Once running, you can access the API docs defined in swagger.yaml using Swagger UI or Postman.