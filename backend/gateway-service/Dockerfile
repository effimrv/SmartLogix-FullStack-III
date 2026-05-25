FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN chmod +x mvnw && ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN keytool -genkeypair -alias gateway -keyalg RSA -keysize 2048 \
    -storetype PKCS12 -keystore /app/keystore.p12 \
    -validity 365 -storepass smartlogix123 \
    -dname "CN=gateway-service,OU=SmartLogix,O=SmartLogix,L=Santiago,ST=RM,C=CL"
EXPOSE 8080 8443
ENTRYPOINT ["java", "-jar", "app.jar"]
