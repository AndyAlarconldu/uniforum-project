# 👥 Follow Service

This microservice is part of the **UniForum** platform backend. It handles all operations related to the **user following system**, including following, unfollowing, and retrieving follower/followed relationships.

---

## 🧰 Tech Stack

- **Python 3**
- **FastAPI** – Web framework
- **SQLAlchemy** – ORM for database access
- **Pydantic** – Data validation
- **Docker** – Containerization
- **PostgreSQL** – Relational database

---

## 📁 Project Structure

```
follow-service/
├── app/
│ ├── crud.py # CRUD logic (create, read, delete)
│ ├── database.py # DB engine and session
│ ├── main.py # Entry point (FastAPI app)
│ ├── models.py # SQLAlchemy models
│ ├── routes.py # API route definitions
│ └── schemas.py # Pydantic schemas for requests/responses
├── Dockerfile # Docker configuration
├── requirements.txt # Python dependencies
```

---

## 🔁 API Endpoints

Here are some common routes (based on `routes.py` and `crud.py` logic):

### `POST /follow`
Follow a user.

**Request Body:**
```json
{
  "follower_id": 1,
  "followed_id": 2
}

DELETE /unfollow
Unfollow a user.

GET /followers/{user_id}
Get a list of followers for a specific user.

GET /following/{user_id}
Get a list of users a specific user is following.

🐳 Docker Usage
To build and run the service in Docker:

docker build -t follow-service .
docker run -p 8002:8002 follow-service
📦 Dependencies
Listed in requirements.txt:

fastapi

uvicorn

sqlalchemy

pydantic

psycopg2-binary

python-dotenv