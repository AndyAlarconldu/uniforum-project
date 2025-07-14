# 🏷️ Top Topic Service

This is a microservice within the **UniForum** platform. Its responsibility is to analyze and return the most frequently used tags (topics) across posts, helping to identify trending academic subjects.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (with `pg` library)
- **Docker**
- **dotenv** for environment variable management
- **CORS** for cross-origin requests

---

## 📁 Folder Structure

```
top-topic-service/
├── src/
│ ├── db.js # PostgreSQL connection pool using dotenv
│ ├── routes.js # GET /top-tags route for fetching top used tags
│ └── server.js # Entry point that configures Express server
├── Dockerfile # Docker container setup
├── package.json # Project metadata and dependencies
├── package-lock.json # Exact dependency versions
├── README.md # Project documentation
```

---

## 🚀 How It Works

### ✅ Endpoint

GET /top-tags

**Returns:** JSON list of top 10 tags with the most post associations.

### 🔍 Example Response:
```json
[
  { "tag": "JavaScript", "count": 45 },
  { "tag": "React", "count": 30 },
  ...
]
