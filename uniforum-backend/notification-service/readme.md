# 📣 UniForum - Notification Service

This microservice is responsible for managing and delivering notifications within the UniForum platform. It supports both REST API and event-driven notification delivery using **RabbitMQ**. Notifications are sent via email and stored in a PostgreSQL database.

---

## 📁 Project Structure
```
notification-service/
└── app/
├── routes/
│ └── notification.py # API endpoint definitions
├── consumer.py # RabbitMQ consumer for async processing
├── crud.py # Functions for database interaction
├── database.py # SQLAlchemy database configuration
├── email_sender.py # Email sending logic using SMTP
├── main.py # FastAPI app initialization
├── models.py # SQLAlchemy models for Notification
└── schemas.py # Pydantic request/response schemas
├── Dockerfile # Docker container configuration
├── requirements.txt # List of dependencies
└── start_consumer.py # Entry point to run RabbitMQ consumer
```

---

## 🚀 Main Endpoints

### ✅ POST `/notifications/`
Send and store a notification.

**Request Body Example**:
```json
{
  "recipient": "user@example.com",
  "subject": "Welcome",
  "message": "Thanks for joining!"
}

Triggers an email and stores the notification using RabbitMQ and the database.

🐳 How to Run with Docker
Make sure you have Docker installed.

docker build -t notification-service .
docker run -p 8001:8001 notification-service

To run the RabbitMQ consumer separately:
docker exec -it <container_id_or_name> python start_consumer.py

📦 Dependencies
FastAPI – Web framework for building APIs

SQLAlchemy – ORM for PostgreSQL

pika – RabbitMQ message queue client

psycopg2-binary – PostgreSQL driver

python-dotenv – Environment variable management

uvicorn – ASGI server for FastAPI

🧩 Notes
The service listens to RabbitMQ events and sends emails asynchronously.

You can configure SMTP settings and database credentials in your .env file.