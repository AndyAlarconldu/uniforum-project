# 💬 UniForum - Chat Service

This microservice enables real-time chat between users on the UniForum platform. It uses **WebSockets** via `socket.io` to allow instant messaging, backed by PostgreSQL to persist messages.

---

## 📁 Project Structure
```
chat-service/
├── src/
│ ├── db.js # PostgreSQL connection pool
│ ├── routes.js # REST API route to fetch message history
│ ├── server.js # Express + Socket.io server initialization
│ └── socket.js # WebSocket event handlers (connection, join, message)
├── Dockerfile # Container definition for the chat service
├── package.json # Project metadata and dependencies

```
---

## 🚀 How It Works

- Real-time messaging is handled using **Socket.IO**.
- Messages are saved in PostgreSQL using a connection pool (`pg` module).
- Clients join a "room" based on `senderId` and `receiverId` to receive messages only relevant to that conversation.
- REST endpoint is available to retrieve previous messages between two users.

---

## 🔌 Endpoints

### WebSocket Events

| Event       | Description                                 |
|-------------|---------------------------------------------|
| `join`      | Joins a room based on sender & receiver IDs |
| `message`   | Sends a message and saves it to DB          |

### REST API

| Method | Endpoint                              | Description                               |
|--------|---------------------------------------|-------------------------------------------|
| GET    | `/messages/:user1/:user2`             | Retrieves message history between users   |

---

## 🐳 Run with Docker

```bash
docker build -t chat-service .
docker run -p 8014:8014 chat-service

🧩 Technologies Used
Node.js + Express – Backend server

Socket.IO – WebSocket communication

PostgreSQL – Message storage

pg – PostgreSQL client for Node.js

Docker – Containerizatio
📦 Requirements
Install dependencies:
npm install

📁 Environment Variables
Make sure to define these in a .env file:

DATABASE_URL=postgresql://user:password@host:port/dbname
PORT=8014
