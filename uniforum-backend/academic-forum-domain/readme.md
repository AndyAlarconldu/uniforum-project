# 🧠 Academic Forum Domain - UniForum Project

This domain manages the core services related to academic discussion within the UniForum platform. It provides functionalities for forum creation, history tracking, content moderation, replies, tagging, and voting mechanisms.

## 📁 Structure
```
academic-forum-domain/
│
├── discussion-service/ # Manages creation and listing of academic discussion threads
├── history-service/ # Tracks the history of posts and edits for audit purposes
├── moderation-service/ # Handles content moderation and approval workflows
├── reply-service/ # Allows users to reply to existing posts
├── tagging-service/ # Enables tagging of posts for better classification
└── voting-service/ # Manages voting (likes/dislikes) on posts and replies
```
## 🧩 Services Overview

### 📌 `discussion-service`
Handles the creation, listing, and details of discussion threads associated with courses.

### 📌 `history-service`
Stores the edit history of forum posts for traceability and transparency.

### 📌 `moderation-service`
Applies moderation rules. Admins or moderators can approve, reject or suggest edits to posts.

### 📌 `reply-service`
Supports threaded replies, allowing users to engage in conversations under specific topics.

### 📌 `tagging-service`
Allows posts to be categorized or labeled using tags (e.g., "exam", "question", "announcement").

### 📌 `voting-service`
Implements a voting mechanism to evaluate content relevance, quality, or popularity.

---

## 🛠 Technologies Used

- **FastAPI** (Python)
- **PostgreSQL** / **MongoDB**
- **Docker**
- **RabbitMQ** (for async communication)
- **JWT** (authentication via user-management domain)

---

## 🔌 Integration Flow

```plaintext
Frontend → API Gateway (Nginx) → academic-forum-domain services
                            ↘ Message Queue (RabbitMQ) for moderation and history logs

