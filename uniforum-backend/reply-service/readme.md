# 💬 UniForum - Servicio de Respuestas (Reply Service)

Este microservicio permite a los estudiantes enviar respuestas a publicaciones dentro de la plataforma UniForum. Está desarrollado con **FastAPI**, **SQLAlchemy**, **PostgreSQL** y **Docker**.

---

## 📁 Estructura del Proyecto
```
reply-service/
├── app/
│ ├── crud.py # Lógica de creación y consultas de respuestas
│ ├── database.py # Configuración y conexión a PostgreSQL
│ ├── main.py # Punto de entrada de la aplicación FastAPI
│ ├── models.py # Modelo SQLAlchemy de la respuesta
│ ├── routes.py # Endpoints de la API
│ └── schemas.py # Esquemas Pydantic (entrada/salida)
├── Dockerfile # Imagen Docker del microservicio
├── requirements.txt # Paquetes requeridos de Python
├── README.md # Documentación del servicio
```

---

## 🚀 Endpoints Principales

| Método | Endpoint      | Descripción                       |
|--------|---------------|-----------------------------------|
| POST   | `/`           | Crear una nueva respuesta         |
| GET    | `/post/{id}`  | Obtener respuestas de un post     |

> Nota: El prefijo base `/` debe estar montado como `/api/replies` o similar en el gateway.

---

## 🐳 Cómo Ejecutar con Docker

### 1. Asegúrate de tener Docker instalado.

### 2. Ejecuta desde la raíz del servicio:

```bash
docker build -t reply-service .
docker run -p 8004:8004 reply-service
🔧 Tecnologías Usadas
Python 3.11

FastAPI

SQLAlchemy

PostgreSQL

Docker

Pydantic

