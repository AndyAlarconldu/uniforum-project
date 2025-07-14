# 💬 Social Interaction Domain - UniForum Project

The `social-interaction-domain` is responsible for managing user-to-user interactions beyond academic discussions. It enables real-time communication, following dynamics, mentions, reactions, and ranking mechanisms to enhance engagement within the platform.

---

## 📁 Structure
```
social-interaction-domain/
│
├── chat-service/ # Real-time chat functionality between users
├── follow-service/ # Follows/followers system between users
├── mention-service/ # Mentions users in posts or comments
├── ranking-service/ # Calculates reputation scores and user rankings
└── reaction-service/ # Handles likes, dislikes, emojis, and other reactions
```
---

## 🧩 Services Overview

### 💬 `chat-service`
- Enables private and group messaging.
- Built with WebSocket (Socket.IO).
- Supports message history and notifications.

### 👤 `follow-service`
- Allows users to follow or unfollow others.
- Tracks following/followers count for user profiles.

### 🔔 `mention-service`
- Detects @mentions in comments or posts.
- Notifies mentioned users through the notification system.

### 🏅 `ranking-service`
- Computes user reputation based on votes, replies, posts, and interactions.
- Generates weekly and monthly leaderboards.

### ❤️ `reaction-service`
- Handles emoji or icon-based reactions to posts and replies.
- Supports reaction types like 👍, 👎, ❤️, 😂.

---

## 🛠 Technologies Used

- **FastAPI** / **Node.js (chat-service)**
- **WebSocket (Socket.IO)** for chat
- **PostgreSQL / MongoDB**
- **JWT Authentication**
- **RabbitMQ** (message-based notification triggers)
- **Docker / Docker Compose**

---

## 🔌 Integration Overview

```plaintext
Frontend ↔ API Gateway ↔ social-interaction-domain services
            ↘ Notifications triggered via RabbitMQ
            ↘ Real-time features via chat-service (WebSocket)
