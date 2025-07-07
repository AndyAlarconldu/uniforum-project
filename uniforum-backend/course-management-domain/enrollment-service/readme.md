# 🎓 UniForum - Enrollment Service

This microservice handles student enrollments in available courses. It's developed using **Python** and the **FastAPI** framework.

---

## 🧱 Project Structure

```
enrollment-service/
├── app/
│ ├── crud.py # Logic to create and query enrollments
│ ├── database.py # Database connection configuration
│ ├── main.py # Main FastAPI application entry point
│ ├── models.py # SQLAlchemy model for the "enrollment" table
│ ├── routes.py # API route definitions
│ └── schemas.py # Input/output validation with Pydantic
├── Dockerfile # Docker image for this service
└── requirements.txt # Python dependencies
```

---

## 🔄 Main Features

- **POST** `/enrollments` – Create a new enrollment  
- **GET** `/enrollments` – Retrieve all enrollments  
- **GET** `/enrollments/student/{student_id}` – Retrieve enrollments by student

---

## 🐳 How to Run with Docker

> Make sure Docker is installed on your system.

```bash
docker build -t enrollment-service .
docker run -p 8010:8010 enrollment-service
The service will be available at:
📍 http://localhost:8010

⚙️ Tech Stack
Python 3.11

FastAPI

SQLAlchemy

PostgreSQL

Docker

Pydantic