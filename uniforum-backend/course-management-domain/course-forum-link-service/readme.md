# 🔗 Course Forum Link Service

This is a microservice within the **UniForum** backend system. Its responsibility is to **associate courses with forums**, allowing educational content to be linked to collaborative discussions.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (via `pg`)
- **Axios**
- **Docker**
- **dotenv** for environment configuration
- **MVC architecture** (Models, Controllers, Routes)

---

## 📁 Folder Structure

```
course-forum-link-service/
├── config/ # DB configuration (PostgreSQL)
│ └── db.js
├── controllers/ # Logic for handling requests
│ └── linkController.js
├── models/ # SQL queries for managing links
│ └── linkModel.js
├── routes/ # API route definitions
│ └── linkRoutes.js
├── index.js # Main entry point
├── Dockerfile # Docker container configuration
├── package.json # Metadata and dependencies
```

---

## 🧠 Service Responsibilities

This service handles the creation and retrieval of **course–forum links**.

### 🔄 Endpoints

#### `POST /links`
Creates a new association between a course and a forum.

**Request Body:**
```json
{
  "id_link": "uuid",
  "course_id": "uuid",
  "forum_id": "uuid"
}

🐳 Docker Support
To build and run using Docker:

docker build -t course-forum-link-service .
docker run -p 8011:8011 course-forum-link-service


📌 Main Dependencies
express: Web framework

pg: PostgreSQL client

cors: Cross-Origin Resource Sharing

dotenv: Environment variable loader

axios: HTTP client (for possible external service calls)