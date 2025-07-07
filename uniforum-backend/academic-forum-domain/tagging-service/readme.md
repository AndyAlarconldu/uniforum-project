# 🏷️ UniForum - Tagging Service

This microservice is responsible for managing post tags within the UniForum platform. It allows for tag creation, assignment of tags to posts, and tag retrieval per post. It is built using **FastAPI**, and stores data in a **PostgreSQL** database using **SQLAlchemy** as ORM.

---

## 📁 Project Structure
```
tagging-service/
├── app/
│ ├── main.py # FastAPI app and router setup
│ ├── crud.py # Business logic for tags and assignments
│ ├── database.py # PostgreSQL connection and base setup
│ ├── models.py # SQLAlchemy models for Tag and PostTag
│ ├── routes.py # Defines the /tags endpoints
│ └── schemas.py # Pydantic models for request and response
├── Dockerfile # Container configuration
├── requirements.txt # Python dependencies

```
---

## 🔗 API Endpoints

| Method | Endpoint              | Description                              |
|--------|------------------------|------------------------------------------|
| POST   | `/tags/`               | Create a new tag                         |
| POST   | `/tags/assign`         | Assign an existing tag to a post         |
| GET    | `/tags/post/{id}`      | Get tags assigned to a specific post     |
| GET    | `/tags/`               | Get all tags                             |

---

## 🐳 Docker Commands

Build the Docker image:

```bash
docker build -t tagging-service .

Run the container:

docker run -p 8006:8006 tagging-service

📦 Requirements
fastapi

uvicorn

sqlalchemy

psycopg2-binary

python-dotenv