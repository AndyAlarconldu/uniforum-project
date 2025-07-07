# 🔐 UniForum - Password Service

This microservice handles **password recovery** in the UniForum platform. It publishes recovery emails to a **RabbitMQ** queue, where the `notification-service` picks them up and delivers the email to the user.

---

## 📂 Project Structure
```
password-service/
├── app/
│ ├── main.py # FastAPI app and router setup
│ ├── rabbitmq.py # Publishes password recovery messages to RabbitMQ
│ ├── routes.py # Defines POST /recover endpoint
│ └── schemas.py # Pydantic model for request validation
├── Dockerfile # Docker build configuration
└── requirements.txt # Python dependencies
```

---

## 🔁 Endpoint

### 📮 POST `/recover`

Sends a password recovery email via RabbitMQ.

#### ✅ Request Example
```json
{
  "email": "user@example.com"
}

📬 Response Example
{
  "message": "Correo de recuperación enviado"
}

📤 Message Published to Queue:
{
  "recipient": "user@example.com",
  "subject": "Recuperación de contraseña - UniForum",
  "message": "Haz clic en el siguiente enlace para restablecer tu contraseña: https://uniform.edu/reset-password?email=user@example.com"
}

🐳 How to Run with Docker
docker build -t password-service .
docker run -p 8002:8002 password-service

🧰 Technologies
FastAPI – Web framework for building REST APIs

Pydantic – Data validation and parsing

RabbitMQ (pika) – Message broker for queueing email tasks

Docker – Containerized deployment
🧩 Related Services
notification-service – Listens to password recovery queue and sends email notifications.