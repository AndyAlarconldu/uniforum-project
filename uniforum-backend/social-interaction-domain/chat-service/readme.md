# 💬 Chat Service

This is a microservice of the **UniForum** backend responsible for real-time chat between users. It integrates **RESTful API**, **WebSockets (Socket.IO)**, **MongoDB**, and **Redis** for messaging and tracking online users.

---

## 🧰 Tech Stack

- **Node.js** + **Express.js**
- **Socket.IO** – Real-time communication
- **MongoDB** with Mongoose – Message storage
- **Redis** – Online user tracking
- **Axios** – Microservice-to-microservice communication
- **Docker** – Containerization
- **dotenv** – Environment configuration

---

## 📁 Folder Structure

```
chat-service/
├── src/
│ ├── models/ # Mongoose schemas (e.g., message.model.js)
│ ├── db.js # MongoDB connection
│ ├── routes.js # REST endpoints
│ ├── server.js # Main server (HTTP + WebSocket)
│ └── socket.js # Socket.IO logic and Redis integration
├── Dockerfile # Docker container configuration
├── package.json # Metadata and dependencies
```

---

## 📌 Features

- **Real-time messaging** via WebSockets.
- **REST API** to retrieve messages by user.
- **MongoDB** stores all messages.
- **Redis** stores online users to improve chat scalability.
- **User data fetching** from another microservice (`USER_SERVICE_URL`).

---

## 🔁 API Endpoints

### `GET /messages?sender_id=...&receiver_id=...`
Returns chat messages between two users.

---

## ⚙️ Running Locally

1. **Clone the repo**
```bash
git clone https://github.com/AndyAlarconldu/uniforum-project.git
cd uniform-backend/social-interaction-domain/chat-service

Install dependencies
npm install

Create a .env file
PORT=8014
MONGODB_URI=mongodb://localhost:27017/uniforum-chat
REDIS_URL=redis://localhost:6379
USER_SERVICE_URL=http://localhost:8030/students

📡 WebSocket Connection
Clients connect to: ws://localhost:8014

On connection, the client must provide the query parameter: user_id

Redis stores online users in a set called online_users

🐳 Docker
To build and run with Docker:
docker build -t chat-service .
docker run -p 8014:8014 chat-service

📦 Dependencies
From package.json:

express

socket.io

mongoose

redis

dotenv

axios