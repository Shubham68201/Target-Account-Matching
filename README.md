# 🎯 Target Account Matching API

A simple Express.js-based REST API that allows user authentication and management of account statuses (Target / Not Target). It demonstrates the use of JWT for authentication and basic CRUD operations for mock company data.

## 🚀 Features

- JWT-based user login
- Protected endpoints with authentication middleware
- Retrieve a list of company accounts
- Update the status of a company (Target / Not Target)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/target-account-api.git
cd target-account-api


2. Install Dependencies
npm install

3. Start the Server
node app.js

By default, the server will run on http://localhost:3000

🔐 Authentication
Login to receive a JWT token

Use the token to access protected routes

🔑 JWT Secret
The secret used for signing tokens is hardcoded in app.js as:
const JWT_SECRET = 'your-secret-key';
In production, consider using environment variables for secrets.

📬 API Endpoints
POST /login
Authenticate a user and return a JWT token.

Request:
{
  "username": "user1",
  "password": "pass123"
}
Response:
{
  "message": "Login successful",
  "token": "<jwt_token>"
}

GET /accounts (Protected)
Retrieve the list of all companies.

Headers:
Authorization: Bearer <jwt_token>

POST /accounts/:id/status (Protected)
Update the status of a company.

URL Param:

:id — Company ID

Request Body:
{
  "status": "Target"
}
Valid values: "Target" or "Not Target"

📌 Notes
This project uses a mock database (in-memory arrays) for users and companies.

In a real-world app, replace this with a proper database (MongoDB, PostgreSQL, etc).
