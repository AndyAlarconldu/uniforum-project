# Etapa 1: compilación
FROM rust:1.74 AS builder

# Instala dependencias necesarias para compilar dependencias de SQLx
RUN apt-get update && apt-get install -y pkg-config libssl-dev

WORKDIR /app

# Copia los archivos de configuración y dependencias primero para usar cache
COPY Cargo.toml Cargo.lock ./
RUN mkdir src
RUN echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -f target/release/deps/config_service*

# Copia el resto del código
COPY . .

# Compila la aplicación en modo release
RUN cargo build --release

# Etapa 2: runtime (más liviana)
FROM debian:bullseye-slim

# Instala librerías necesarias en tiempo de ejecución
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && apt-get clean

WORKDIR /app

# Copia el binario compilado desde la etapa anterior
COPY --from=builder /app/target/release/config-service .

# Puerto expuesto
EXPOSE 8022

# Ejecuta el binario
CMD ["./config-service"]
