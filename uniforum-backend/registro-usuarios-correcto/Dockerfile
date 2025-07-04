# Dockerfile para microservicios Java (Spring Boot)
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copiar archivos y compilar
COPY . .


RUN ./mvnw clean package -DskipTests

# Ejecutar el jar (ajusta el nombre del jar final)
CMD ["java", "-jar", "target/registro-usuarios-correcto-0.0.1-SNAPSHOT.jar"]
