# PrepAI--One-stop-for-Placement-training
An AI-powered placement preparation platform built with Spring Boot, MongoDB, and JWT Authentication to help students prepare for technical interviews through personalized learning, resume analysis, mock interviews, and coding practice.
# 🚀 PrepAI – AI-Powered Placement Preparation Platform

<p align="center">
  <h3 align="center">Prepare Smarter. Crack Interviews Faster.</h3>
  <p align="center">
    An AI-powered placement preparation platform built to help students excel in technical interviews through personalized learning, mock interviews, resume analysis, coding practice, and performance tracking.
  </p>
</p>

---

## 📖 About the Project

PrepAI is a full-stack AI-powered placement preparation platform designed to simplify and enhance the interview preparation journey for students.

The platform combines modern backend architecture with AI capabilities to provide personalized interview preparation, resume evaluation, coding practice, and performance analytics.

The current version focuses on building a secure, scalable backend with authentication and user management, serving as the foundation for future AI-driven modules.

---

# ✨ Features

## ✅ Implemented

- User Registration
- Secure Login System
- JWT Authentication & Authorization
- Password Encryption using BCrypt
- MongoDB Integration
- RESTful APIs
- Global Exception Handling
- Request Validation
- DTO-based Data Transfer
- Clean Layered Architecture
- Production-ready Project Structure

## 🚧 Upcoming Features

- 🤖 AI Resume Analyzer
- 🎤 AI Mock Interview
- 📄 Resume Builder
- 📈 Personalized Learning Dashboard
- 💻 Coding Practice Platform
- 🧠 AI Interview Feedback
- 📊 Progress Analytics
- 🎯 Company-wise Interview Preparation
- 📚 Personalized Study Roadmaps
- 💬 AI Career Assistant

---

# 🏗️ Architecture

```
                    Frontend (React)
                           │
                           ▼
                    REST API Requests
                           │
                           ▼
                      Controller Layer
                           │
                           ▼
                       Service Layer
                           │
                Business Logic & Validation
                           │
                           ▼
                    Repository Layer
                           │
                           ▼
                         MongoDB
```

### Authentication Flow

```
User Login
     │
     ▼
Authentication Manager
     │
     ▼
JWT Token Generated
     │
     ▼
Client Stores Token
     │
     ▼
Authorization Header
     │
     ▼
JWT Filter
     │
     ▼
Protected APIs
```

---

# 📂 Project Structure

```
src
└── main
    ├── java
    │   └── com.prepai
    │       ├── config
    │       ├── controller
    │       ├── dto
    │       ├── entity
    │       ├── exception
    │       ├── repository
    │       ├── security
    │       ├── service
    │       ├── utils
    │       └── PrepAiApplication.java
    │
    └── resources
        └── application.properties
```

---

# 🛠 Tech Stack

## Backend

- Java
- Spring Boot
- Spring Security
- Spring Data MongoDB
- JWT Authentication
- Maven

## Database

- MongoDB

## API Testing

- Postman

## Development Tools

- IntelliJ IDEA
- VS Code
- Git
- GitHub

## Planned AI Stack

- OpenAI API / Gemini API
- LangChain
- Vector Database
- RAG (Retrieval-Augmented Generation)

---

# 🔐 Security

PrepAI follows industry-standard security practices.

- JWT Authentication
- Stateless Authentication
- BCrypt Password Encryption
- Protected REST APIs
- Request Validation
- Global Exception Handling

---

# 📌 REST APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/user/profile` | Get logged-in user |
| PUT | `/api/user/profile` | Update profile |

> More APIs will be added as development progresses.

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/yourusername/prepai.git
```

## Navigate to the Project

```bash
cd prepai
```

## Install Dependencies

```bash
mvn clean install
```

## Run the Application

```bash
mvn spring-boot:run
```

The server will start at:

```
http://localhost:8080
```

---

# ⚙️ Configuration

Update your `application.properties` file:

```properties
spring.data.mongodb.uri=YOUR_MONGODB_URI

jwt.secret=YOUR_SECRET_KEY

jwt.expiration=86400000
```

---

# 🎯 Project Goals

- Build a scalable placement preparation platform.
- Leverage AI for personalized interview guidance.
- Help students improve technical and soft skills.
- Provide intelligent resume analysis.
- Track preparation progress with analytics.
- Deliver company-specific interview experiences.

---

# 📅 Roadmap

### Phase 1 ✅
- Backend Setup
- MongoDB Integration
- JWT Authentication
- User Management
- Layered Architecture

### Phase 2 🚧
- Resume Management
- Coding Practice Module
- Dashboard
- Progress Tracking

### Phase 3
- AI Resume Review
- AI Mock Interviews
- AI Feedback
- AI Career Mentor

### Phase 4
- Company-wise Preparation
- Gamification
- Leaderboards
- Personalized Study Plans

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 👩‍💻 Author

**Rashi Verma**

B.Tech Computer Science Engineering

Java Backend Developer | Spring Boot | MongoDB | AI Enthusiast

---

## ⭐ Star this repository if you found it helpful!
