# 🎓 UniForum - Course Service

This microservice manages the course information available on the **UniForum** platform. It is built using **Python** and **FastAPI**.

---

## 🧱 Project Structure

course-service/
│
├── app/
│ ├── crud.py # CRUD operations using SQLAlchemy
│ ├── database.py # Database connection settings
│ ├── main.py # FastAPI application entry point
│ ├── models.py # Course model definition
│ ├── routes.py # API routes for courses
│ └── schemas.py # Input/output schemas using Pydantic
│
├── Dockerfile # Docker image for this microservice
├── requirements.txt # Python dependencies
└── README.md # Microservice documentation

---

## 🚀 Main Endpoints

| Method | Endpoint                                 | Description                     |
|--------|------------------------------------------|---------------------------------|
| POST   | `/courses`                               | Create a new course             |
| GET    | `/courses`                               | Retrieve all courses            |
| GET    | `/courses/university/{university_id}`    | Get courses by university ID    |

---

## 🐳 How to Run with Docker

```bash
docker build -t course-service .
docker run -p 8009:8009 course-service

🔧 Technologies Used
Language: Python (FastAPI)

Database: PostgreSQL (shared across all services)

CI/CD: GitHub Actions + DockerHub + SSH deploy to EC2

Infrastructure:

AWS EC2 (1 instance per microservice + 1 for database)

Load Balancer + Auto Scaling Group

Multi-AZ for high availability

Containerization: Docker