# 🗳️ UniForum - Voting Service

This microservice manages **voting functionality** on discussion posts within the UniForum platform. It allows students to upvote or downvote posts, ensuring that each student can vote only once per post.

---

## 📁 Project Structure
```
voting-service/
├── app/
│ ├── crud.py # Logic for creating and querying votes
│ ├── database.py # PostgreSQL database setup
│ ├── main.py # FastAPI app and route registration
│ ├── models.py # SQLAlchemy model (PostVote)
│ ├── routes.py # Defines the /votes endpoints
│ └── schemas.py # Pydantic input/output models
├── Dockerfile
└── requirements.txt
```

---

## 🔗 Endpoints

| Method | Path                           | Description                              |
|--------|--------------------------------|------------------------------------------|
| POST   | `/votes/`                      | Registers a new vote (up/down)           |
| GET    | `/votes/post/{post_id}`        | Returns the vote score (upvotes - downvotes) |
| GET    | `/votes/student/{student_id}`  | Retrieves all votes made by a student    |

---

### 📝 Request Example (POST `/votes/`)

```json
{
  "id_vote": "v001",
  "student_id": "stu456",
  "post_id": "post123",
  "vote_type": "upvote"
}

🐳 How to Run with Docker
docker build -t voting-service .
docker run -p 8005:8005 voting-service

⚙️ Technologies Used
FastAPI – High-performance web framework

SQLAlchemy – ORM for database interaction

PostgreSQL – Relational database

Pydantic – Data validation

Docker – Containerization for deployment