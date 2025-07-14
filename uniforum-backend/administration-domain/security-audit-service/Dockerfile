# Etapa 1: compilación
FROM rust:1.74 AS builder

# Instala dependencias necesarias para compilar SQLx
RUN apt-get update && apt-get install -y pkg-config libssl-dev

WORKDIR /app

# Copiar archivos de configuración primero (para aprovechar el cache)
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -f target/release/deps/security_audit_service*

# Copiar el resto del código fuente
COPY . .

# Compilar binario final optimizado
RUN cargo build --release

# Etapa 2: imagen ligera
FROM debian:bullseye-slim

# Instala runtime de SSL
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && apt-get clean

WORKDIR /app

# Copiar el binario desde la etapa anterior
COPY --from=builder /app/target/release/security-audit-service .

# Exponer el puerto del servicio
EXPOSE 8023

# Ejecutar el servicio
CMD ["./security-audit-service"]
