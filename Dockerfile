# Use the official OpenJDK 17 as a base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the Docker container
WORKDIR /app

# Copy the build artifact (jar file) from the Gradle build output directory
COPY build/libs/*.jar app.jar

# Set environment variable for proper encoding
ENV LANG C.UTF-8

# Expose the port the application runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
