# Etapa de construcción
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copia go.mod y go.sum para descargar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copia todo el código fuente
COPY . .

# Construye el binario ejecutable
RUN go build -o log-service .

# Etapa de ejecución
FROM alpine:latest

WORKDIR /app

# Copia el binario desde la etapa de construcción
COPY --from=builder /app/log-service .

# Copia el archivo .env si lo usas
COPY .env .

# Expone el puerto del microservicio
EXPOSE 8030

# Comando para ejecutar el servicio
CMD ["./log-service"]
