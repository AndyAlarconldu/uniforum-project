# Construir imagen
docker build -t config-service .

# Ejecutar contenedor (si tienes red externa con PostgreSQL)
docker run --name config-service --network uniforum_net -p 8022:8022 --env-file .env config-service
