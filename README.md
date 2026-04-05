# Finance Data Processing & Access Control Backend

---

## Overview

This project is a backend system designed to manage financial records with strict role-based access control (RBAC) and provide aggregated dashboard insights.

The system focuses on real-world backend engineering practices including secure authorization, structured API design, and backend-driven data processing.

---
## API Walkthrough Video

This video demonstrates the complete functionality of the backend including authentication, role-based access control, financial record operations, and dashboard APIs.

https://drive.google.com/file/d/1WmFz7uiDFyV8G0Gh0Iw9Ts2n_j83I4EE/view?usp=sharing

---

## Key Highlights

* Backend-enforced Role-Based Access Control (RBAC)
* Secure authentication using JWT
* Financial record management with full CRUD support
* Aggregated dashboard APIs
* Middleware-driven security architecture
* Rate limiting and secure headers

---
## ARCHITECTURE SUMMARY

This backend follows a layered architecture designed for security, scalability, and maintainability.
All requests pass through a structured pipeline where authentication, authorization, and validation are handled before business logic execution.

## REQUEST FLOW

<img width="882" height="1665" alt="diagram-export-4-5-2026-2_35_51-PM" src="https://github.com/user-attachments/assets/dfb17e04-e32a-4857-a3ec-d59a12fe6faa" />


## KEY HIGHLIGHTS

- Backend-Enforced RBAC
  All role-based access control is handled strictly on the backend using middleware.
  No role data is trusted from the client.

- Middleware-First Security Design
  Authentication (JWT), authorization, rate limiting, and security headers are applied
  before reaching controllers.

- Separation of Concerns
  Routes → API structure
  Controllers → Business logic
  Models → Data schema
  Middleware → Security & validation

- Stateless Authentication
  JWT-based authentication enables scalable and session-independent request handling.

- Backend Aggregation
  Dashboard insights such as totals and balances are computed server-side.

- Production-Level Security
  Helmet, rate limiting, protected routes, and centralized error handling.
--
## DESIGN GOAL

To build a backend system where security, access control, and data integrity are enforced entirely on the server.

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```


---

## Setup Instructions

1. Clone the repository

git clone https://github.com/hariniworkspace/finance-dashboard-backend
cd backend

---

2. Install dependencies

npm install

---

3. Configure environment variables

PORT=5000  
MONGO_URI=mongodb+srv://hariniworkspace_db_user:harini2819@cluster0.qyl4t61.mongodb.net/finance-dashboard  
JWT_SECRET=V7@xP3!qZ9#Lm2$Rw8Tn6&YbC4^kD1fHsA5jQ0uE  

---

4. Run the server

npm run dev

---
## Deployed API

This backend is deployed using Render and accessible via the following base URL.  
All API endpoints can be tested using tools like Postman or integrated with a frontend application.

https://your-deployed-link.com
---

## System Design Considerations

### Scalability

* Stateless JWT authentication supports horizontal scaling
* Modular architecture allows easy feature expansion

---

### Security

* Backend-enforced RBAC
* No trust on client-provided roles
* Rate limiting prevents abuse

---

### Maintainability

* Clear separation of concerns
* Modular folder structure
* Centralized error handling

---

### Trade-offs

* Pagination not implemented to keep logic focused
* Refresh tokens not included for simplicity

---

## Future Improvements

* Pagination and filtering
* Refresh token mechanism
* Logging and monitoring
* Unit and integration testing
* API documentation (Swagger)

---

## Author

Harini Thiyagarajan

GitHub: https://github.com/hariniworkspace  
LinkedIn: https://www.linkedin.com/in/harinithiyagarajan28/

---

## Final Note

This project demonstrates backend engineering with a focus on structured architecture, security, and real-world API design.
