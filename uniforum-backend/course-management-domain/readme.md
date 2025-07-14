# 📚 Course Management Domain - UniForum Project

The `course-management-domain` handles all operations related to academic courses within the UniForum platform. It is responsible for managing course data, enrollment processes, schedules, and integration with Learning Management Systems (LMS).

---

## 📁 Structure
```
course-management-domain/
│
├── academic-schedule-service/ # Manages academic schedules and time blocks
├── course-forum-link-service/ # Links courses to discussion forums
├── course-service/ # Core course creation and management logic
├── enrollment-service/ # Handles student enrollment and withdrawal
└── sync-lms-service/ # Synchronizes course data with external LMS platforms
```
---

## 🧩 Services Overview

### 🗓️ `academic-schedule-service`
- Stores and manages course calendars, class timings, and academic sessions.
- Supports recurring schedules and academic blocks.

### 🔗 `course-forum-link-service`
- Connects each course with its corresponding forum in the academic-forum-domain.
- Enables automatic creation of forum threads based on course activity.

### 📘 `course-service`
- Core service for course CRUD operations.
- Manages course metadata such as name, description, instructor, and department.

### 🧾 `enrollment-service`
- Allows students to enroll or withdraw from courses.
- Verifies pre-requisites and manages capacity limits.

### 🔄 `sync-lms-service`
- Syncs course and enrollment data with external platforms like Moodle or Canvas.
- Ensures consistency between UniForum and institutional LMS.

---

## 🛠 Technologies Used

- **FastAPI** (Python)
- **PostgreSQL / MongoDB**
- **RabbitMQ** (for messaging)
- **JWT** (for authentication and permissions)
- **Docker / Docker Compose**

---

## 🔌 Integration Flow

```plaintext
Frontend → API Gateway → Course Management Services
               ↘ Integration with academic-forum-domain (forum linking)
               ↘ Integration with LMS (sync-lms-service)
