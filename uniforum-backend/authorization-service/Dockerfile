# Dockerfile para microservicios Java (Spring Boot)
FROM eclipse-temurin:17-jdk-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos y compilar
COPY . .

# Construir la app (reemplaza si ya tienes el .jar)
RUN ./mvnw clean package -DskipTests

# Ejecutar el jar (ajusta el nombre del jar final)
CMD ["java", "-jar", "target/authorization-service-0.0.1-SNAPSHOT.jar"]