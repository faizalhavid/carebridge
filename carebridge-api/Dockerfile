FROM openjdk:22-jdk-slim

ARG APP_PORT=8080

WORKDIR /app
COPY target/*.jar app.jar

EXPOSE ${APP_PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]