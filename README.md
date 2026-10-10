# PrepAI — One-Stop for Placement Training

**Prepare smarter. Practise with purpose. Track your placement journey.**

PrepAI is a full-stack placement preparation platform designed to help students organize their job search, practise technical interviews, assess their answers with AI, and track their preparation progress in one place.

The application combines a React-based frontend with a Java Spring Boot backend, MongoDB persistence, JWT-based authentication, and an AI integration for interview question generation and answer assessment.

> **Project status:** Core placement-preparation modules include dashboard, resume record management, text-based AI mock interviews, AI-generated answer feedback and reporting, DSA progress tracking, placement application tracking, and student profile management. The exact availability of individual endpoints depends on the current backend implementation and configuration.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Application Screens](#application-screens)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [How the AI Interview Flow Works](#how-the-ai-interview-flow-works)
- [Module Breakdown](#module-breakdown)
- [Authentication and Security](#authentication-and-security)
- [Data and Persistence](#data-and-persistence)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Testing and Troubleshooting](#testing-and-troubleshooting)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

Placement preparation often involves separate tools for interview practice, resume records, DSA progress, job applications, and performance review. PrepAI brings these workflows together in a single student-focused application.

Students can maintain placement-related information, practise interview questions in text format, receive AI-generated feedback on submitted answers, review performance reports, and monitor preparation activity. The dashboard presents a consolidated view of the student's current preparation status.

## Key Features

### 1. Student Dashboard
- Overview of resume records, DSA progress, AI interview access, and placement applications.
- Quick navigation to the main preparation modules.
- A preparation status summary and a suggested daily task list.
- Readiness information based on the data available to the application.

### 2. Resume Management
- Create and manage resume records.
- Store resume title, URL, file type, and file-size metadata.
- View saved records and open a resume through its URL.
- Update or delete records through the connected backend APIs.

**Note:** Resume record management is distinct from automated parsing or AI evaluation of the resume's contents. Describe resume analysis as implemented only if the corresponding backend workflow is present and configured.

### 3. Text-Based AI Mock Interviews
- Configure an interview by role, difficulty, experience level, and number of questions.
- Receive interview questions from the backend.
- Submit written answers to each question.
- Receive AI-generated feedback and an assessment score for an answer.
- Continue through the interview session and access the resulting report.

**Interview format:** Text-based; it is not a voice-interview feature.

### 4. AI Interview Assessment and Reporting
The interview report interface presents assessment information such as:
- Overall score.
- Technical score.
- Communication score.
- Confidence score.
- Problem-solving score.
- Strengths and weaknesses.
- Improvement suggestions.
- Overall feedback.

AI-generated assessments should be treated as guidance rather than an objective or guaranteed measure of interview performance.

### 5. Performance Analytics
- Present interview assessment results in a consolidated report.
- Highlight strengths and areas that need improvement.
- Help students identify topics to practise next.
- Provide a foundation for tracking progress across multiple sessions, where historical data is available.

### 6. DSA Progress Tracker
- Add topics to practise.
- Record difficulty, total problems, and solved problems.
- View overall progress.
- Organize preparation by topic.

The tracker records progress entered into the application; it should not be described as an online coding judge unless code execution and test-case evaluation are implemented.

### 7. Placement Application Tracker
- Record company name, role, package offered, and location.
- Track application dates and application status.
- Record upcoming interview dates and notes.
- Filter application records by status.

### 8. Student Profile
- Manage student details such as college, branch, CGPA, and graduation year.
- Store profile links such as GitHub, LinkedIn, and LeetCode.
- Maintain skills, a resume URL, and a short bio.

### 9. Personalized Study Roadmaps
PrepAI includes personalized study-roadmap functionality intended to help students decide what to focus on next. The quality of personalization depends on the data and recommendation logic available to the application.

A stronger future version can combine interview performance, DSA progress, target roles, and placement timelines to prioritize learning activities.

---

## Application Screens

The application interface includes the following screens:

1. **Dashboard** — preparation overview and module summaries.
2. **Resume** — create, view, edit, and delete resume records.
3. **Interview Setup** — select role, difficulty, experience level, and question count.
4. **Interview Session** — view a question and submit a text answer.
5. **AI Interview Report** — review scores, feedback, strengths, weaknesses, and suggestions.
6. **DSA Tracker** — record topic-wise practice progress.
7. **Placement Tracker** — manage company applications and their status.
8. **Profile** — manage student and professional information.

<img width="591" height="308" alt="Screenshot 2026-10-10 153448" src="https://github.com/user-attachments/assets/c2e84da8-036c-4c8c-89c6-e95b60f40410" />
<img width="610" height="335" alt="Screenshot 2026-10-10 153430" src="https://github.com/user-attachments/assets/794fdb4e-3f30-4d34-b432-24ad724ea95a" />
<img width="655" height="337" alt="Screenshot 2026-10-10 153418" src="https://github.com/user-attachments/assets/202a7fda-a2fe-4ee6-9d57-97e1db4e8142" />
<img width="601" height="338" alt="Screenshot 2026-10-10 153411" src="https://github.com/user-attachments/assets/3a63c00d-6a58-4704-a437-f3bc35e0cb41" />



---

## Technology Stack

### Frontend
- React
- JavaScript
- HTML and CSS

### Backend
- Java
- Spring Boot
- Spring Web / REST APIs
- Spring Security
- Spring Data MongoDB
- JWT-based authentication
- BCrypt password hashing
- DTO-based request and response handling
- Bean Validation and exception handling

### Database
- MongoDB

### AI Integration
- Groq API for language-model-powered interview functionality, where configured.
- Java HTTP client integration using `RestTemplate` in the backend implementation.
- Jackson `ObjectMapper` for JSON processing.

### Development and API Testing
- Maven
- Git and GitHub
- Postman
- IntelliJ IDEA and/or Visual Studio Code

> Keep this list aligned with the dependencies and configuration currently present in the repository. Do not list RAG, LangChain, a vector database, or additional AI providers as implemented unless they have actually been integrated.

---

## System Architecture

PrepAI uses a frontend–backend architecture with a layered Spring Boot backend.

```text
+------------------------------------------------------+
|                  React Frontend                      |
| Dashboard | Resume | Interview | DSA | Placement     |
| Profile | AI Report | Study Roadmap                  |
+---------------------------+--------------------------+
                            |
                            | HTTP requests / JSON
                            v
+------------------------------------------------------+
|                 Spring Boot Backend                  |
|                                                      |
|  Controller Layer                                    |
|       |                                              |
|       v                                              |
|  Service Layer                                       |
|       |                         |                    |
|       v                         v                    |
|  Repository Layer          AI Integration Service    |
|       |                         |                    |
+-------+-------------------------+--------------------+
        |                         |
        v                         v
     MongoDB                 Groq API
```

### Layer Responsibilities

- **Controller layer:** Exposes endpoints, receives requests, and returns HTTP responses.
- **Service layer:** Contains business rules and coordinates repository and AI operations.
- **Repository layer:** Performs persistence operations through Spring Data MongoDB.
- **Entity/model classes:** Represent application data stored in MongoDB.
- **DTOs:** Define request and response payloads separately from persistence models.
- **Security/configuration:** Sets up authentication, authorization, filters, and application beans.
- **Exception handling:** Converts application errors into consistent API responses.
- **AI integration service:** Encapsulates calls to the configured language-model provider and processes its responses.

### Authentication Flow

```text
Student submits login credentials
             |
             v
Spring Security authentication
             |
             v
Password verified against BCrypt hash
             |
             v
JWT issued after successful authentication
             |
             v
Client sends token with protected requests
             |
             v
JWT validation and authorization
             |
             v
Protected controller and service logic
```

Exact token storage and request behavior depend on the frontend implementation and security configuration.

---

## How the AI Interview Flow Works

The text-based interview workflow follows this conceptual sequence:

1. The student chooses the role, difficulty, experience level, and number of questions.
2. The frontend sends the interview configuration to the backend.
3. The backend validates the request and coordinates interview-session logic.
4. The AI integration service sends a prompt to the configured language-model API when a question or evaluation is required.
5. The backend processes the model response and returns the question or assessment to the frontend.
6. The student submits a written answer.
7. The backend requests or processes an AI assessment of that answer.
8. Feedback and relevant interview data are returned to the UI and persisted where implemented.
9. The application presents an interview report after the session is completed.

The backend should validate model output rather than blindly trusting generated text or scores. AI output can be inconsistent, incomplete, or malformed.

---

## Module Breakdown

| Module | Main responsibility |
|---|---|
| Dashboard | Summarizes preparation activity and links to modules |
| Resume Management | Manages resume records and metadata |
| AI Interview | Manages interview configuration, questions, and written answers |
| AI Assessment | Returns feedback and assessment information for answers |
| Performance Report | Presents scores, strengths, weaknesses, and suggestions |
| DSA Tracker | Records topic-wise problem-solving progress |
| Placement Tracker | Stores and filters job application records |
| Student Profile | Manages academic, personal, and professional profile data |
| Study Roadmap | Provides preparation recommendations based on available information |
| Authentication | Registers users, authenticates logins, and protects resources |

---

## Authentication and Security

The backend's security foundation includes:

- JWT-based authentication for protected API access.
- BCrypt password hashing.
- Spring Security configuration.
- Request validation.
- DTO-based API boundaries.
- Centralized exception handling.

### Security recommendations
- Keep database credentials, JWT signing secrets, and AI API keys outside source control.
- Use environment variables or a secrets manager for sensitive configuration.
- Apply authorization checks to ensure users can access only their own private records.
- Configure CORS explicitly for the deployed frontend origin.
- Validate uploaded or linked file metadata and limit request sizes.
- Use HTTPS in production.
- Avoid logging passwords, tokens, API keys, or sensitive personal information.
- Apply appropriate rate limits to authentication and AI endpoints.

---

## Data and Persistence

MongoDB stores application data as documents. Depending on the current implementation, logical data groups can include:

- User accounts and profiles.
- Resume records.
- Interview sessions and submitted answers.
- AI evaluation results and reports.
- DSA topic progress.
- Placement application records.
- Study-roadmap recommendations.

These are logical categories, not a guarantee of exact collection names or document schemas. Confirm the actual model and repository classes before documenting a specific schema.

---

## Project Structure

The repository contains a `backend` directory. The backend source follows a layered package structure similar to the following:

```text
PrepAI--One-stop-for-Placement-training/
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/prepai/
│           │       ├── config/
│           │       ├── controller/
│           │       ├── dto/
│           │       ├── entity/
│           │       ├── exception/
│           │       ├── repository/
│           │       ├── security/
│           │       ├── service/
│           │       ├── utils/
│           │       └── PrepAiApplication.java
│           └── resources/
│               └── application.properties
├── README.md
└── docs/
    └── screenshots/
```

The structure above illustrates the documented backend layout. The `docs/screenshots/` directory is a suggested addition; create it before adding screenshots. Update the tree if the actual package names or file locations differ.

---

## Getting Started

### Prerequisites

Install the following:

- A JDK version compatible with the project's `pom.xml`.
- Maven, or use the Maven Wrapper if it is included.
- MongoDB or a MongoDB Atlas connection.
- A Groq API key if running AI features that depend on Groq.
- Node.js and npm if the frontend source is available locally.

### 1. Clone the repository

```bash
git clone https://github.com/RashiVerma14/PrepAI--One-stop-for-Placement-training.git
cd PrepAI--One-stop-for-Placement-training
```

### 2. Configure the backend

Navigate to the backend directory:

```bash
cd backend
```

Configure MongoDB, JWT, and AI-provider settings using the properties and environment-variable names supported by the current code. Do not commit secrets.

### 3. Build and run

If Maven is installed:

```bash
mvn clean install
mvn spring-boot:run
```

If the repository includes the Maven Wrapper, use the wrapper command appropriate for your operating system instead.

The server commonly runs at `http://localhost:8080`, unless the application configuration specifies a different port.

### 4. Run the frontend

If the frontend is maintained in a separate directory or repository, navigate to that project, install its dependencies, configure its backend API base URL, and start it using the scripts defined in its `package.json`.

The public repository structure should be updated if the frontend source is later added to this repository.

---

## Configuration

Use the configuration keys expected by the actual application. Typical settings may include:

```properties
spring.data.mongodb.uri=${MONGODB_URI}
jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION:86400000}
```

For an AI provider, configure its API key through the property or environment-variable name used by the current `GroqService` implementation.

**Important:** These property names are examples. Confirm that they match the code before using them. Never paste real secrets into `application.properties`, commit them to Git, or publish them in screenshots.

---

## API Documentation

The backend README previously listed the following authentication and profile endpoints. Confirm the mappings in the current controllers before treating this table as a complete API specification.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/user/profile` | Retrieve the authenticated user's profile |
| `PUT` | `/api/user/profile` | Update the authenticated user's profile |

The application UI also uses backend APIs for resume records, interview sessions and assessments, DSA tracking, placement records, dashboard information, and related functionality.

For a complete API reference, document each endpoint's method, path, request DTO, response DTO, authentication requirements, status codes, and example payload after verifying the implementation.

---

## Testing and Troubleshooting

### Recommended checks
- Confirm the configured MongoDB URI is correct and the database is reachable.
- Confirm that required environment variables are set.
- Confirm the configured AI API key is valid and the provider has available quota.
- Test authentication and protected endpoints using Postman.
- Verify that unauthorized users cannot access another user's private records.
- Test invalid input, expired or malformed tokens, AI timeouts, and database failures.
- Check backend logs for exceptions without exposing credentials or personal data.

### Common issues
- **MongoDB connection failure:** Check the URI, network access, credentials, and database availability.
- **401 Unauthorized:** Check login status, token expiration, token signature, and the authorization header.
- **AI API failure:** Check provider credentials, rate limits, timeouts, and response parsing.
- **Frontend cannot reach backend:** Check the API base URL, backend port, CORS configuration, and whether the server is running.

---

## Future Improvements

Potential enhancements include:

- Automated resume parsing and rubric-based resume analysis.
- More consistent, versioned AI evaluation rubrics.
- Historical performance trends and skill-wise analytics.
- Roadmap recommendations driven by interview results, DSA progress, and target roles.
- Pagination, database indexes, and improved query efficiency.
- Unit, integration, and security tests in CI.
- Structured logging, metrics, and health monitoring.
- Secure resume file storage and upload validation.
- Background processing for long-running AI tasks.
- Retrieval-Augmented Generation (RAG) over curated interview material, if a grounded knowledge source is needed.
- Rate limiting, usage quotas, and AI cost monitoring.
- Responsive UI and accessibility improvements.

These are possible improvements, not claims that the features are already implemented.

---

## Author

**Rashi Verma**  
B.Tech student | Java Backend Development | Spring Boot | MongoDB | AI-powered applications

- GitHub: [@RashiVerma14](https://github.com/RashiVerma14)

---

If you find PrepAI useful, consider starring the repository.
