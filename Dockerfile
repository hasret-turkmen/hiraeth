# it creates a base image. i used openjdk 17.
FROM openjdk:17-jdk-slim

# create directory inside the Docker container
WORKDIR /app

# create output directory (copy the build artifact -jar file)
COPY build/libs/*.jar app.jar

# Set environment variable for proper encoding
ENV LANG C.UTF-8

# expose the port for the app to run on
EXPOSE 8080

# run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
