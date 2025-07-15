# 🎓 UniForum Project

**UniForum** is an academic platform built using a microservices architecture. Its main goal is to support student interaction through discussion forums, voting, commenting, real-time chat, and user profile management. The system is designed to be scalable, modular, secure, and easy to maintain.

---

## 📌 Key Features

- User registration, login, and JWT-based authentication
- Password recovery via email using RabbitMQ queues
- Academic discussion forum with replies and tags
- Voting system for replies (upvotes/downvotes)
- Post tagging system
- Real-time chat using WebSocket
- API Gateway with NGINX
- Asynchronous service communication with RabbitMQ
- PostgreSQL and MongoDB databases
- Deployment on AWS with Auto Scaling and Load Balancer
- CI/CD pipeline using GitHub Actions

---

## 🧱 Architecture

- **Architectural style**: Microservices
- **Design patterns**: SOLID, KISS, DRY, Domain-Driven Design (DDD)
- **Communication styles**:
  - REST APIs (standard services)
  - WebSocket (real-time chat)
  - RabbitMQ (asynchronous events)

---

## 🗂️ Microservices

| Microservice        | Description                                           | Technology            |
|---------------------|-------------------------------------------------------|------------------------|
| `auth-service`      | User login, registration, and JWT token validation    | FastAPI + PostgreSQL  |
| `password-service`  | Password reset via email using message queue          | FastAPI + RabbitMQ    |
| `perfil-service`    | User profile management                               | FastAPI + PostgreSQL  |
| `reply-service`     | Handling of replies to posts                          | FastAPI + MongoDB     |
| `tagging-service`   | Post tagging                                          | FastAPI + MongoDB     |
| `voting-service`    | Reply voting system (upvote/downvote)                | FastAPI + MongoDB     |
| `chat-service`      | Real-time chat using WebSocket                        | Node.js + Socket.IO   |
| `api-gateway`       | NGINX gateway that routes to internal microservices   | NGINX                 |

---

## 🧪 Tech Stack

- **Backend**: FastAPI, Node.js, Express
- **Messaging**: RabbitMQ
- **Databases**:
  - PostgreSQL (auth, profile)
  - MongoDB (replies, votes, tags)
- **Frontend (future)**: React (planned)
- **DevOps**: Docker, GitHub Actions, AWS EC2, Auto Scaling, ALB, Multi-AZ
- **WebSocket**: Real-time communication using `Socket.IO`

---

## 🚀 Deployment

Each microservice includes its own `Dockerfile`. Deployment is done individually on EC2 instances with an Application Load Balancer.

1. **Clone the repository**
   ```bash
   git clone https://github.com/AndyAlarconldu/uniforum-project.git

   🔐 Security
JWT authentication and route protection

Input validation using Pydantic

Secure routing and error handling middleware
🧠 Repository Structure
```
uniforum-project/
│
├── auth-service/
├── password-service/
├── perfil-service/
├── reply-service/
├── tagging-service/
├── voting-service/
├── chat-service/
├── api-gateway/
└── README.md
```

📈 Planned Features
Notification system (RabbitMQ + Email)

Admin dashboard

React-based frontend with Tailwind

Course and enrollment modules

✍️ Author
👨‍💻 Developer: Andy Alarcón

🌐 Repository: uniforum-projec