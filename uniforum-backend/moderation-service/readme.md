# 🕘 UniForum - History Service

The **History Service** is a microservice of the UniForum platform. It is responsible for storing and retrieving the edit history of student posts. This service helps maintain transparency and accountability by tracking content changes over time.

---

## 🧱 Project Structure
```
history-service/
├── app/
│ ├── crud.py # Logic for creating and retrieving history entries
│ ├── database.py # PostgreSQL database connection
│ ├── main.py # FastAPI initialization and route inclusion
│ ├── models.py # SQLAlchemy model definition (PostHistory)
│ ├── routes.py # HTTP endpoints
│ └── schemas.py # Pydantic schemas (input/output)
├── Dockerfile # Docker container definition
├── requirements.txt # Project dependencies
├── readme.md # Project documentation
```

---

## 🗃️ Data Model

The `PostHistory` model represents an edit made to a post. It contains the following fields:

```python
class PostHistory(Base):
    __tablename__ = "post_history"
    id_history: str
    post_id: str
    title: str
    content: str
    edited_by: str
    edited_at: datetime = datetime.now()



---

## 🗃️ Data Model

The `PostHistory` model represents an edit made to a post. It contains the following fields:

```python
class PostHistory(Base):
    __tablename__ = "post_history"
    id_history: str
    post_id: str
    title: str
    content: str
    edited_by: str
    edited_at: datetime = datetime.now()


🔁 Available Endpoints
📌 Create a Post Edit History
POST /history/

Request Body:
{
  "id_history": "uuid",
  "post_id": "string",
  "title": "string",
  "content": "string",
  "edited_by": "string"
}


🐳 How to Run with Docker
Make sure you have Docker installed. Then run:
docker build -t history-service .
docker run -p 8008:8008 history-service


📦 Requirements
FastAPI – Web framework for building APIs

Uvicorn – ASGI server for FastAPI

SQLAlchemy – ORM for database models

Psycopg2-binary – PostgreSQL adapter for Python

python-dotenv – Environment variable loader