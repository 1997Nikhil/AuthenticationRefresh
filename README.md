# 🔐 JWT Authentication System — React + Node.js + MongoDB


![alt text](352f9936-6637-4eee-87c0-5a76db467498.png)

A complete full-stack authentication system built with **React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, Axios, and bcrypt**.

This project demonstrates a practical authentication architecture using:

- 🔑 Short-lived JWT Access Tokens
- 🔄 Long-lived JWT Refresh Tokens
- 🍪 HttpOnly Cookies
- 🛡️ Protected Routes
- 🔁 Axios Request/Response Interceptors
- ♻️ Automatic Access Token Refresh
- 🔒 Password Hashing with bcrypt
- 🚪 Logout and Refresh Token invalidation
- ⚛️ React Context API
- 🗄️ MongoDB / MongoDB Atlas
- 🧪 Thunder Client API testing
- 🎨 Responsive Login, Register, and Dashboard UI

---

## 📸 Authentication Flow

> The flowchart below explains registration, login, protected API access, automatic token refresh, and logout.

![JWT Authentication Flow](docs/jwt-authentication-flow.png)

If the image is not visible on GitHub, make sure the generated flowchart is saved at:

```text
docs/jwt-authentication-flow.png
```

---

# 📚 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Authentication Flow](#-authentication-flow)
- [Access Token vs Refresh Token](#-access-token-vs-refresh-token)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Run the Application](#-run-the-application)
- [Frontend Pages](#-frontend-pages)
- [API Endpoints](#-api-endpoints)
- [Thunder Client Testing](#-thunder-client-testing)
- [Testing Access Token Expiration](#-testing-access-token-expiration)
- [Automatic Token Refresh](#-automatic-token-refresh)
- [Protected Routes](#-protected-routes)
- [How Refresh Token Works](#-how-refresh-token-works)
- [Logout Flow](#-logout-flow)
- [Security](#-security)
- [Common Errors](#-common-errors)
- [Production Improvements](#-production-improvements)
- [Learning Objectives](#-learning-objectives)
- [Author](#-author)
- [License](#-license)

---

# 🚀 Project Overview

The application implements a complete JWT-based authentication system.

A user can:

1. Register an account.
2. Login with email and password.
3. Receive a short-lived Access Token.
4. Receive a long-lived Refresh Token through an HttpOnly cookie.
5. Access protected APIs using the Access Token.
6. Automatically obtain a new Access Token when the old one expires.
7. Continue using protected APIs without logging in again.
8. Logout and invalidate the Refresh Token.

The main authentication principle is:

```text
Access Token
    ↓
Used to access protected APIs

Refresh Token
    ↓
Used only to obtain a new Access Token
```

---

# ✨ Features

## Authentication

- User Registration
- User Login
- Password Hashing
- JWT Access Token
- JWT Refresh Token
- HttpOnly Refresh Token Cookie
- Token Expiration
- Automatic Token Refresh
- Logout
- Refresh Token Invalidation

## Frontend

- React.js
- React Router
- Axios
- Context API
- Protected Routes
- Axios Request Interceptor
- Axios Response Interceptor
- Automatic API retry
- Login page
- Register page
- Dashboard
- Responsive styling

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS
- dotenv
- REST APIs

## Testing

- Thunder Client
- Browser DevTools
- Network tab
- Application → Cookies
- Access Token expiration testing

---

# 🔐 Authentication Flow

The application uses two tokens.

```text
                         LOGIN
                           │
                           ▼
                    ┌──────────────┐
                    │    Backend   │
                    └──────┬───────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
          Access Token          Refresh Token
                │                     │
                ▼                     ▼
         React Memory          HttpOnly Cookie
                │                     │
                ▼                     │
       Protected API Calls            │
                                      │
                                      ▼
                                  /refresh
                                      │
                                      ▼
                               New Access Token
```

---

# 🔑 Access Token vs Refresh Token

| Feature | Access Token | Refresh Token |
|---|---|---|
| Purpose | Access protected APIs | Generate a new Access Token |
| Lifetime | Short | Long |
| Example | 15 minutes | 7 days |
| Storage | React memory | HttpOnly cookie |
| Sent with | Authorization header | Cookie |
| Read by React | Yes | No |
| Used for API access | Yes | No |
| Used for refresh | No | Yes |

### Example

```text
Access Token:
eyJhbGciOiJIUzI1NiIs...

Refresh Token:
eyJhbGciOiJIUzI1NiIs...
```

The Access Token is sent as:

```http
Authorization: Bearer ACCESS_TOKEN
```

The Refresh Token is sent automatically by the browser as a cookie.

---

# 🏗️ Project Architecture

```text
                         ┌──────────────────────┐
                         │     React Frontend   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                             Axios Instance
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
             Request Interceptor          Response Interceptor
                    │                               │
                    ▼                               ▼
              Access Token                    Handle 401
                    │                               │
                    │                               ▼
                    │                         /auth/refresh
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend   │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
              Auth Routes      JWT Middleware     User Routes
                  │                 │                 │
                  └─────────────────┼─────────────────┘
                                    │
                                    ▼
                             ┌──────────────┐
                             │   MongoDB    │
                             └──────────────┘
```

---

# 🔄 Complete Authentication Lifecycle

## 1. Registration

```text
User
 │
 ▼
Register Form
 │
 ▼
POST /api/auth/register
 │
 ▼
Validate Input
 │
 ▼
Hash Password with bcrypt
 │
 ▼
Save User
 │
 ▼
MongoDB
```

## 2. Login

```text
User
 │
 ▼
Login Form
 │
 ▼
POST /api/auth/login
 │
 ▼
Find User
 │
 ▼
Compare Password
 │
 ▼
Generate Access Token
 │
 ▼
Generate Refresh Token
 │
 ├───────────────┐
 ▼               ▼
Access Token   Refresh Token
 │               │
 ▼               ▼
React Memory   HttpOnly Cookie
```

## 3. Protected API

```text
React
 │
 ▼
API Request
 │
 ▼
Authorization: Bearer ACCESS_TOKEN
 │
 ▼
Express Backend
 │
 ▼
JWT Middleware
 │
 ▼
Verify Access Token
 │
 ├── Valid ──────► Protected Controller
 │                       │
 │                       ▼
 │                    200 OK
 │
 └── Expired ─────► 401 Unauthorized
```

## 4. Token Refresh

```text
Protected API
 │
 ▼
Access Token Expired
 │
 ▼
401 Unauthorized
 │
 ▼
Axios Response Interceptor
 │
 ▼
POST /api/auth/refresh
 │
 ▼
Browser sends HttpOnly Refresh Token Cookie
 │
 ▼
Backend verifies Refresh Token
 │
 ▼
Generate New Access Token
 │
 ▼
React receives New Access Token
 │
 ▼
Retry Original API Request
 │
 ▼
200 OK
```

## 5. Logout

```text
User clicks Logout
 │
 ▼
POST /api/auth/logout
 │
 ▼
Backend invalidates Refresh Token
 │
 ▼
Refresh Token Cookie cleared
 │
 ▼
Access Token cleared from React memory
 │
 ▼
User redirected to Login
```

---

# 📁 Project Structure

```text
jwt-authentication/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   └── token.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   └── tokenStore.js
│   │   │
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   └── jwt-authentication-flow.png
│
├── .gitignore
└── README.md
```

---

# 🛠️ Technologies Used

## Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| React Router | Client-side routing |
| Axios | API requests |
| Context API | Authentication state |
| CSS | Styling |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| cookie-parser | Cookie handling |
| CORS | Cross-origin requests |
| dotenv | Environment variables |

## Development & Testing

| Tool | Purpose |
|---|---|
| Thunder Client | API testing |
| MongoDB Atlas | Cloud database |
| Git | Version control |
| GitHub | Source code hosting |

---

# 📋 Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB
- Git
- VS Code
- Thunder Client extension

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/jwt-authentication.git
```

Go to the project:

```bash
cd jwt-authentication
```

---

# 🖥️ Backend Setup

Go to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_EXPIRES=7d

CLIENT_URL=http://localhost:5173
```

### Development Example

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jwt_auth

ACCESS_TOKEN_SECRET=your_super_secret_access_token_key

REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key

ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_EXPIRES=7d

CLIENT_URL=http://localhost:5173
```

### For Testing Token Expiration

Temporarily change:

```env
ACCESS_TOKEN_EXPIRES=30s

REFRESH_TOKEN_EXPIRES=10m
```

Restart the backend after changing `.env`.

> Never commit `.env` to GitHub.

---

# ▶️ Start Backend

From the `backend` folder:

```bash
npm run dev
```

Or:

```bash
npm start
```

Expected backend URL:

```text
http://localhost:5000
```

Example console:

```text
MongoDB connected
Server running on port 5000
```

---

# ⚛️ Frontend Setup

Open another terminal.

Go to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌐 Frontend Pages

## Register

```text
http://localhost:5173/register
```

Users can create an account.

---

## Login

```text
http://localhost:5173/login
```

Users can login using email and password.

---

## Dashboard

```text
http://localhost:5173/dashboard
```

The Dashboard is protected and requires authentication.

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Generate new Access Token |
| POST | `/api/auth/logout` | Logout user |

## User

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/api/users/profile` | Access Token required |

---

# 👤 Register API

### Request

```http
POST http://localhost:5000/api/auth/register
```

Body:

```json
{
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "Test@12345"
}
```

### Expected Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Nikhil",
    "email": "nikhil@test.com"
  }
}
```

Expected status:

```text
201 Created
```

---

# 🔑 Login API

### Request

```http
POST http://localhost:5000/api/auth/login
```

Body:

```json
{
  "email": "nikhil@test.com",
  "password": "Test@12345"
}
```

### Response

```json
{
  "message": "Login successful",
  "accessToken": "ACCESS_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Nikhil",
    "email": "nikhil@test.com"
  }
}
```

The Refresh Token is sent through an HttpOnly cookie.

---

# 👤 Protected Profile API

### Request

```http
GET http://localhost:5000/api/users/profile
```

Header:

```http
Authorization: Bearer ACCESS_TOKEN
```

### Response

```json
{
  "message": "Protected profile",
  "user": {
    "id": "USER_ID",
    "email": "nikhil@test.com"
  }
}
```

---

# 🔄 Refresh Token API

### Request

```http
POST http://localhost:5000/api/auth/refresh
```

No request body is required.

The browser/HTTP client sends the Refresh Token cookie.

### Response

```json
{
  "accessToken": "NEW_ACCESS_TOKEN"
}
```

---

# 🚪 Logout API

### Request

```http
POST http://localhost:5000/api/auth/logout
```

### Response

```json
{
  "message": "Logout successful"
}
```

After logout:

- Refresh Token is invalidated.
- Refresh Token cookie is cleared.
- Access Token is cleared from frontend memory.
- User is redirected to Login.

---

# 🧪 Thunder Client Testing

Before testing the React frontend, it is recommended to test all backend APIs with Thunder Client.

Create a collection:

```text
JWT Authentication
```

Add:

```text
01 - Register
02 - Login
03 - Get Profile
04 - Refresh Token
05 - Logout
06 - Refresh After Logout
07 - Login Wrong Password
08 - Profile Without Token
09 - Profile Invalid Token
```

---

# 🧪 Test 1 — Register

Request:

```http
POST http://localhost:5000/api/auth/register
```

Body → JSON:

```json
{
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "Test@12345"
}
```

Expected:

```text
201 Created
```

---

# 🧪 Test 2 — Login

Request:

```http
POST http://localhost:5000/api/auth/login
```

Body:

```json
{
  "email": "nikhil@test.com",
  "password": "Test@12345"
}
```

Expected:

```text
200 OK
```

You should receive:

```text
Access Token
```

and a:

```text
refreshToken cookie
```

---

# 🧪 Test 3 — Get Profile

Request:

```http
GET http://localhost:5000/api/users/profile
```

Header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Expected:

```text
200 OK
```

---

# 🧪 Test 4 — Profile Without Token

Remove the Authorization header.

Request:

```http
GET http://localhost:5000/api/users/profile
```

Expected:

```text
401 Unauthorized
```

---

# 🧪 Test 5 — Invalid Access Token

Use:

```http
Authorization: Bearer abc123
```

Expected:

```text
401 Unauthorized
```

---

# 🧪 Test 6 — Refresh Token

After the Access Token expires:

```http
POST http://localhost:5000/api/auth/refresh
```

Expected:

```text
200 OK
```

Response:

```json
{
  "accessToken": "NEW_ACCESS_TOKEN"
}
```

---

# 🧪 Test 7 — Use New Access Token

Use the newly generated Access Token:

```http
GET http://localhost:5000/api/users/profile
```

Header:

```http
Authorization: Bearer NEW_ACCESS_TOKEN
```

Expected:

```text
200 OK
```

---

# 🧪 Test 8 — Logout

Request:

```http
POST http://localhost:5000/api/auth/logout
```

Expected:

```text
200 OK
```

---

# 🧪 Test 9 — Refresh After Logout

Request:

```http
POST http://localhost:5000/api/auth/refresh
```

Expected:

```text
401 Unauthorized
```

This confirms the Refresh Token has been invalidated.

---

# ⏱️ Testing Access Token Expiration

For easy testing, configure:

```env
ACCESS_TOKEN_EXPIRES=30s
REFRESH_TOKEN_EXPIRES=10m
```

Restart the backend.

### Step 1

Login.

### Step 2

Open Dashboard.

### Step 3

Call the protected profile API.

You should receive:

```text
200 OK
```

### Step 4

Wait approximately 30–40 seconds.

The Access Token should now be expired.

### Step 5

Trigger the protected API again.

You should see:

```text
GET /api/users/profile
        ↓
401 Unauthorized
        ↓
POST /api/auth/refresh
        ↓
200 OK
        ↓
GET /api/users/profile
        ↓
200 OK
```

This confirms automatic token refresh is working.

---

# 🔁 Automatic Token Refresh

The Axios Response Interceptor handles expired Access Tokens.

Simplified logic:

```javascript
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true
        }
      );

      const newAccessToken =
        response.data.accessToken;

      setAccessToken(newAccessToken);

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
```

---

# 🧠 Why Axios Interceptors?

Without an interceptor, every API request would need manual token refresh handling.

Without interceptor:

```javascript
try {
  await api.get("/users/profile");
} catch (error) {
  if (error.response.status === 401) {
    // refresh manually
  }
}
```

With an interceptor:

```javascript
await api.get("/users/profile");
```

The interceptor automatically handles:

```text
401
 ↓
Refresh
 ↓
New Access Token
 ↓
Retry
```

---

# 🛡️ Protected Routes

The Dashboard uses a Protected Route.

```text
                         /dashboard
                              │
                              ▼
                      ProtectedRoute
                              │
                 ┌────────────┴────────────┐
                 │                         │
          Authenticated              Not Authenticated
                 │                         │
                 ▼                         ▼
             Dashboard                   /login
```

---

# 🍪 Refresh Token Cookie

The Refresh Token should be stored using an HttpOnly cookie.

Example backend configuration:

```javascript
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

### Why HttpOnly?

JavaScript cannot directly read an HttpOnly cookie.

Therefore:

```javascript
document.cookie
```

will not expose the Refresh Token.

The browser sends it automatically when making an eligible request.

---

# 🌐 Axios Configuration

The frontend Axios instance should include:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
```

`withCredentials: true` is important because the Refresh Token is stored in a cookie.

---

# 🔒 Password Security

Passwords should never be stored as plain text.

User enters:

```text
Test@12345
```

Backend hashes it:

```text
bcrypt.hash()
        ↓
$2b$10$xxxxxxxxxxxxxxxxxxxxxxxx
```

MongoDB stores the hash:

```json
{
  "password": "$2b$10$xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

It should never store:

```json
{
  "password": "Test@12345"
}
```

---

# 🗄️ Example User Document

Example:

```json
{
  "_id": "USER_ID",
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "$2b$10$...",
  "refreshToken": "..."
}
```

After logout:

```json
{
  "_id": "USER_ID",
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "$2b$10$...",
  "refreshToken": null
}
```

> For a production system, prefer storing a hash of the Refresh Token rather than the raw token and implement refresh-token rotation/reuse detection.

---

# 🔐 Security Practices

This project follows several important security principles:

- Passwords are hashed using bcrypt.
- Access Tokens are short-lived.
- Refresh Tokens are stored in HttpOnly cookies.
- Refresh Tokens are not exposed to React JavaScript.
- Protected APIs require an Authorization header.
- JWT secrets are stored in environment variables.
- MongoDB credentials are stored in environment variables.
- CORS is configured explicitly.
- Logout invalidates the Refresh Token.
- `.env` is excluded from Git.

---

# ⚠️ Important: Do Not Commit Secrets

Never upload:

```text
.env
```

to GitHub.

Your `.gitignore` should contain:

```gitignore
node_modules/
.env
.env.local
dist/
build/
```

Never commit:

```text
MONGO_URI
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
Database Password
API Keys
Private Keys
```

---

# 🐛 Common Errors

## 1. ERR_CONNECTION_REFUSED

If you see:

```text
POST http://localhost:5000/api/auth/register
net::ERR_CONNECTION_REFUSED
```

Make sure the backend is running:

```bash
cd backend
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

If Thunder Client also cannot connect, check the backend server first.

---

# 🐛 2. CORS Error

Make sure backend CORS allows the React application:

```text
http://localhost:5173
```

Example:

```javascript
cors({
  origin: "http://localhost:5173",
  credentials: true
})
```

---

# 🐛 3. Refresh Token Not Sent

Check Axios:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
```

Also check backend CORS:

```javascript
cors({
  origin: "http://localhost:5173",
  credentials: true
})
```

---

# 🐛 4. MongoDB Connection Error

Check:

```env
MONGO_URI=your_mongodb_connection_string
```

Make sure:

- MongoDB Atlas cluster is running.
- Your IP is allowed in MongoDB Atlas.
- Username is correct.
- Password is correct.
- Database name is correct.

---

# 🐛 5. JWT Invalid Signature

Make sure the same secret is used when signing and verifying the token.

Example:

```env
ACCESS_TOKEN_SECRET=your_access_token_secret
```

The backend should use the same value for:

```javascript
jwt.sign()
```

and:

```javascript
jwt.verify()
```

---

# 🐛 6. Refresh Token Expired

If the Refresh Token itself has expired:

```text
Access Token ❌
Refresh Token ❌
```

The user must login again.

Expected flow:

```text
Protected API
      ↓
401
      ↓
/refresh
      ↓
401
      ↓
Clear Authentication
      ↓
Redirect to Login
```

---

# 🧪 Browser DevTools Testing

After login, open:

```text
F12
```

Go to:

```text
Application
    ↓
Storage
    ↓
Cookies
```

Select:

```text
http://localhost:5000
```

You should see:

```text
refreshToken
```

The cookie should have:

```text
HttpOnly: ✓
```

---

# 🌐 Network Tab

Open:

```text
F12 → Network
```

After the Access Token expires, trigger a protected API.

You should see:

```text
profile       401
refresh       200
profile       200
```

This means:

```text
Access Token expired
        ↓
Refresh Token used
        ↓
New Access Token generated
        ↓
Original request retried
```

---

# 📊 Complete Request Flow

```text
┌─────────────┐
│    React    │
└──────┬──────┘
       │
       │ Authorization: Bearer ACCESS_TOKEN
       ▼
┌─────────────┐
│   Express   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ JWT Middleware  │
└──────┬──────────┘
       │
       ├──── Valid ──────► Controller ─────► 200
       │
       └──── Expired ────► 401
                              │
                              ▼
                       Axios Interceptor
                              │
                              ▼
                       POST /refresh
                              │
                              ▼
                     HttpOnly Cookie
                     Refresh Token
                              │
                              ▼
                         Express
                              │
                              ▼
                     Verify Refresh Token
                              │
                              ▼
                    Generate New Access Token
                              │
                              ▼
                            React
                              │
                              ▼
                    Retry Original Request
                              │
                              ▼
                            200
```

---

# 🎯 Complete Flow Summary

```text
Register
   ↓
Login
   ↓
Get Access Token + Refresh Token
   ↓
Access Token → React Memory
Refresh Token → HttpOnly Cookie
   ↓
Access Protected APIs
   ↓
Access Token Expires
   ↓
API returns 401
   ↓
Axios Interceptor
   ↓
Send Refresh Request
   ↓
Browser sends Refresh Token Cookie
   ↓
Backend validates Refresh Token
   ↓
Generate New Access Token
   ↓
Save New Access Token
   ↓
Retry Original Request
   ↓
Continue Using Application
   ↓
Logout
   ↓
Invalidate Refresh Token
   ↓
Clear Authentication
   ↓
Login
```

---

# 🚀 Production Improvements

This project is designed for learning and practical demonstration.

For production, consider adding:

- Refresh Token Rotation
- Hashed Refresh Tokens
- Refresh Token Reuse Detection
- Token Family Tracking
- CSRF Protection
- Rate Limiting
- Helmet
- Input Validation
- Account Lockout
- Email Verification
- Forgot Password
- Reset Password
- Role-Based Authorization
- Admin Dashboard
- OAuth / Google Login
- Two-Factor Authentication
- Email Notifications
- Audit Logs
- Secure HTTPS
- Production Cookie Configuration
- Centralized Error Handling

---

# 📈 Future Features

Planned or possible features:

```text
✓ Registration
✓ Login
✓ JWT Access Token
✓ JWT Refresh Token
✓ Protected Routes
✓ Automatic Token Refresh
✓ Logout

○ Forgot Password
○ Email Verification
○ Google Authentication
○ Role-Based Access
○ Admin Dashboard
○ Two-Factor Authentication
○ Refresh Token Rotation
○ Rate Limiting
```

---

# 📚 Learning Objectives

This project helps understand:

- JWT Authentication
- Access Tokens
- Refresh Tokens
- HttpOnly Cookies
- Cookie-based authentication
- Password hashing
- bcrypt
- Express Middleware
- JWT Middleware
- React Context API
- Axios Interceptors
- Protected Routes
- Automatic token refresh
- MongoDB authentication
- REST API authentication
- CORS
- Authentication state management
- Token expiration
- Logout and token invalidation

---

# 🎓 What Happens When the Access Token Expires?

This is the most important concept in this project.

```text
Access Token
      │
      ▼
Expires
      │
      ▼
Protected API
      │
      ▼
401 Unauthorized
      │
      ▼
Axios Response Interceptor
      │
      ▼
POST /auth/refresh
      │
      ▼
Refresh Token Cookie
      │
      ▼
Backend verifies Refresh Token
      │
      ▼
Generate New Access Token
      │
      ▼
React receives New Access Token
      │
      ▼
Retry Original Request
      │
      ▼
200 OK
```

The user does **not** need to login again unless the Refresh Token is also invalid or expired.

---

# 👨‍💻 Author

## Nikhil Dadhich

**Full Stack Developer | MERN Stack**

### Skills

```text
React.js
Node.js
Express.js
MongoDB
Mongoose
JavaScript
JWT
REST APIs
Axios
Git
GitHub
```

---

# ⭐ Support

If you found this project useful, please consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project is created for learning and demonstration purposes.

You are free to modify and extend it for your own projects.
