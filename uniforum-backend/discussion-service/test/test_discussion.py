from fastapi.testclient import TestClient
from app.main import app  

client = TestClient(app)

def test_create_post():
    payload = {
        "id_post": "post_123", 
        "title": "Título de prueba",
        "content": "Contenido de prueba",
        "student_id": "stu001" 
    }
    response = client.post("/discussions/", json=payload)
    assert response.status_code == 200 or response.status_code == 201
    data = response.json()
    assert data["title"] == payload["title"]
    assert data["content"] == payload["content"]

def test_get_posts():
    response = client.get("/discussions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
