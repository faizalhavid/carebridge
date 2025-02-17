# CareBridge Monorepo

CareBridge is a healthcare application system developed with a monorepo architecture. This repository includes several main components, including **carebridge-api**, which serves as the backend REST API built with Spring Boot.

## 📌 Project Structure

```
carebridge/
│── carebridge-api/      
│── carebridge-admin/    
│── carebridge-mobile/   
│── docs/                
│── README.md          
```

## 🚀 Technologies Used

- **Backend:** Java 17, Spring Boot, Spring Security, Spring Data JPA
- **Database:** PostgreSQL
- **Authentication:** JWT
- **API Documentation:** Swagger (Springdoc OpenAPI)
- **Build Tool:** Maven

## 🏗 Installation & Setup

### 1️⃣ Clone Repository

```sh
git clone https://github.com/faizalhavid/carebridge.git
cd carebridge/carebridge-api
```

### 2️⃣ Configure Environment

Create a `.env` file or configure `application.properties`:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/carebridge_db
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password
APPLICATION_JWT_SECRET_KEY=your_secret_key
```

### 3️⃣ Run the Application

```sh
mvn spring-boot:run
```

The application will run on `http://localhost:8080`.

### 4️⃣ Access API Documentation

Once the application is running, open:

- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON:** `http://localhost:8080/v3/api-docs`

## 📌 Main Features (carebridge-api)

✅ **User Management & Authentication** (JWT-based authentication)\
✅ **Patient Data & Medical Records Management**\
✅ **Consultation Scheduling**\
✅ **Health History Logging**\
✅ **Third-party System Integration** *(if applicable)*

## 💡 Contribution

1. Fork this repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m 'Description of changes'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Create a pull request

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

