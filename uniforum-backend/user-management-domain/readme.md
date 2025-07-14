# 👥 User Management Domain - UniForum Project

The `user-management-domain` handles all services related to user registration, authentication, profile management, notifications, and account recovery. It ensures secure access and personalized interaction within the UniForum ecosystem.

---

## 📁 Structure
```
user-management-domain/
│
├── auth-service-final/ # Handles login, registration, and token generation
├── authorization-service/ # Controls user roles and permissions
├── notification-service/ # Sends system notifications (email, in-app)
├── password-service/ # Manages password reset and recovery
├── perfil-service/ # Handles profile creation and updates
└── registro-usuarios-correcto/ # Experimental or backup user registration module
```
---

## 🧩 Services Overview

### 🔐 `auth-service-final`
- Performs user authentication (login/logout).
- Issues and validates JWT tokens.
- Handles user registration and email confirmation.

### 🛡️ `authorization-service`
- Assigns and verifies user roles (e.g., student, moderator, admin).
- Enforces access control policies across services.

### 🔔 `notification-service`
- Sends notifications for events like post replies, mentions, moderation alerts.
- Supports email and in-app messaging using RabbitMQ.

### 🔑 `password-service`
- Handles password reset requests and token-based recovery.
- Sends secure reset links to user emails.

### 👤 `perfil-service`
- Manages user profile details (name, bio, avatar, career, etc.).
- Supports profile editing and data privacy preferences.

### 🧪 `registro-usuarios-correcto`
- Likely a test, legacy or backup module for registration logic.
- Can be deprecated if `auth-service-final` covers all flows.

---

## 🛠 Technologies Used

- **FastAPI / Node.js**
- **PostgreSQL / MongoDB**
- **JWT Authentication**
- **RabbitMQ (message queue)**
- **Docker / Docker Compose**

---

## 🔌 Integration Flow

```plaintext
Frontend → API Gateway → auth-service-final, perfil-service, etc.
                             ↘ Notification events via RabbitMQ
                             ↘ Role checks via authorization-service
🔐 Security Notes
•	All endpoints protected with JWT-based authentication.
•	Role-based access managed by authorization-service.
•	Password recovery is tokenized and time-limited for security.
