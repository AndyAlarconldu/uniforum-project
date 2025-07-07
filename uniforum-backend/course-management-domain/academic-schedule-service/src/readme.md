# 🧩 Academic Schedule Service - `src/` Directory

This directory contains the core logic of the **Academic Schedule Service**, which manages course schedules in the UniForum platform. It is implemented using **Node.js**, **Express**, and connects to a **PostgreSQL** database.

---

## 📁 Structure Overview
```
src/
├── controllers/
│ └── schedule.controller.js # Handles HTTP request logic (GET, POST, PUT, DELETE)
├── db/
│ └── index.js # Database connection configuration using pg
├── models/
│ └── schedule.model.js # SQL queries for manipulating the schedules table
├── routes/
│ └── schedule.routes.js # Defines API routes and binds them to controller logic
└── app.js # Express app configuration and route setup
```

---

## 📌 Purpose of Each Component

- **controllers/schedule.controller.js**  
  Defines the request handling logic for retrieving, creating, updating, and deleting schedules. Uses the model functions and sends appropriate HTTP responses.

- **db/index.js**  
  Establishes a PostgreSQL database connection using the `pg` library and environment variables.

- **models/schedule.model.js**  
  Contains the raw SQL queries to interact with the `schedules` table. Implements functions like `findAll`, `findById`, `create`, `update`, and `remove`.

- **routes/schedule.routes.js**  
  Sets up the HTTP endpoints and maps them to corresponding controller functions. Example routes:
  - `GET /` – Get all schedules
  - `POST /` – Create a new schedule
  - `PUT /:id` – Update an existing schedule
  - `DELETE /:id` – Delete a schedule

- **app.js**  
  Initializes the Express app, configures middleware (e.g., `cors`, `express.json()`), and mounts the `/api/schedules` routes.

---

## 🔗 Entry Point

This folder is imported into `server.js`, which launches the Express application using:

```js
require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 8012;
app.listen(PORT, () => {
  console.log(`Academic Schedule Service running on port ${PORT}`);
});

✅ Requirements
Node.js

Express

pg (PostgreSQL client)

dotenv

cors
