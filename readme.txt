# 🎓 UniForum - Distributed Academic Forum Platform

UniForum is a distributed academic forum system built with microservices architecture, allowing university students to post discussions, reply, vote, moderate content, and use tags for better organization. 
The system is scalable, resilient, and deployed in production using AWS services with CI/CD pipelines via GitHub Actions.

---

## 🧩 Microservices Architecture

The system is composed of 5 core microservices + API Gateway:

| Microservice         | Description                             | Technology | Public IP          | Port |
|----------------------|-----------------------------------------|------------|--------------------|------|
| Discussion Service   | Manages creation and retrieval of posts | FastAPI    | `3.133.193.135`    | 8003 |
| Reply Service        | Handles replies to posts                | FastAPI    | `3.146.199.86`     | 8004 |
| Moderation Service   | Filters and flags inappropriate content | FastAPI    | `3.135.115.212`    | 8005 |
| Tagging Service      | Assigns tags to posts                   | FastAPI    | `3.149.157.22`     | 8007 |
| Voting Service       | Voting system with reputation support   | FastAPI    | `3.12.41.158`      | 8006 |
| API Gateway          | Central entry point to the platform     | Nginx      | `3.128.173.203`    | 80   |

> ⚠️ The frontend is run **locally**, and communicates with the API Gateway (`3.128.173.203`).

---

## ⚙️ Technologies Used

- **Languages**: Python (FastAPI), Node.js (API Gateway)
- **Databases**: PostgreSQL (Shared across all services)
- **CI/CD**: GitHub Actions + DockerHub + SSH deploy to EC2
- **Infrastructure**: 
  - AWS EC2 (1 instance per microservice + 1 for DB)
  - Load Balancer + Auto Scaling Group
  - Multi-AZ for high availability
- **Containerization**: Docker

---

## 🚀 How to Use

### 🖥️ Frontend (Local)

1. Clone the frontend repo:
   ```bash
   git clone https://github.com/your-username/uniforum-frontend
   cd uniforum-frontend
   npm install
   npm run dev
