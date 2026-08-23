# 🔐 JWT Authentication System

A full-stack authentication system built using **React.js, Node.js, Express.js, MongoDB, and JWT**.

This project demonstrates a complete authentication flow using:

- User Registration
- User Login
- JWT Access Token
- JWT Refresh Token
- HttpOnly Cookies
- Protected Routes
- Axios Interceptors
- Automatic Access Token Refresh
- Password Hashing with bcrypt
- Logout
- React Context API
- MongoDB
- Thunder Client API Testing
- Responsive React UI

---

# 📌 Project Overview

This project implements a secure authentication system where users can:

1. Create an account
2. Login
3. Receive an Access Token
4. Receive a Refresh Token through an HttpOnly Cookie
5. Access protected APIs
6. Automatically refresh the Access Token when it expires
7. Logout and invalidate the Refresh Token

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
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
              Request Interceptor        Response Interceptor
                    │                             │
                    │                             │
                    ▼                             ▼
             Access Token                 Handle 401
                    │                             │
                    │                             ▼
                    │                       /auth/refresh
                    │                             │
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │    Express Backend   │
                        └──────────┬───────────┘
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
                 ▼                 ▼                 ▼
              Auth Routes      JWT Middleware    User Routes
                 │                 │                 │
                 └─────────────────┼─────────────────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │   MongoDB    │
                           └──────────────┘


🔑 Authentication Architecture

The application uses two different JWT tokens.

┌───────────────────────────┐
│           LOGIN           │
└──────────────┬────────────┘
               │
               ▼
        ┌───────────────┐
        │ Backend Server│
        └───────┬───────┘
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
 Access Token       Refresh Token
        │                │
        ▼                ▼
 React Memory       HttpOnly Cookie
        │                │
        ▼                ▼
 Protected APIs      /auth/refresh
🔐 Access Token

The Access Token is used to access protected APIs.

Example:

GET /api/users/profile
Authorization: Bearer ACCESS_TOKEN

The Access Token should have a short lifetime.

Example:

ACCESS_TOKEN_EXPIRES=15m

For testing, you can temporarily use:

ACCESS_TOKEN_EXPIRES=30s
🔄 Refresh Token

The Refresh Token is used to generate a new Access Token after the Access Token expires.

The Refresh Token is stored in an:

HttpOnly Cookie

React does not directly access the Refresh Token.

The browser automatically sends the cookie to the backend.

Access Token expires
        │
        ▼
Protected API returns 401
        │
        ▼
Axios Response Interceptor
        │
        ▼
POST /api/auth/refresh
        │
        ▼
Browser sends Refresh Token Cookie
        │
        ▼
Backend validates Refresh Token
        │
        ▼
Backend creates new Access Token
        │
        ▼
React receives new Access Token
        │
        ▼
Original API request is retried
📁 Project Structure
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
├── .gitignore
└── README.md
🛠️ Technologies Used
Frontend
Technology	Purpose
React.js	Frontend UI
React Router	Routing
Axios	HTTP Requests
Context API	Authentication State
CSS	UI Styling
Backend
Technology	Purpose
Node.js	JavaScript Runtime
Express.js	Backend Framework
MongoDB	Database
Mongoose	MongoDB ODM
JWT	Authentication
bcrypt	Password Hashing
cookie-parser	Cookie Handling
CORS	Cross-Origin Requests
dotenv	Environment Variables
⚙️ Installation
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/jwt-authentication.git

Go to the project:

cd jwt-authentication
🖥️ Backend Setup

Go to the backend folder:

cd backend

Install dependencies:

npm install
🔐 Backend Environment Variables

Create a .env file inside:

backend/.env

Add:

PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_EXPIRES=7d

CLIENT_URL=http://localhost:5173

Example:

PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jwt_auth

ACCESS_TOKEN_SECRET=your_super_secret_access_token_key

REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key

ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_EXPIRES=7d

CLIENT_URL=http://localhost:5173

Never upload your .env file to GitHub.

▶️ Start Backend

From the backend folder:

npm run dev

Or:

npm start

The backend should run on:

http://localhost:5000

Expected console output:

MongoDB connected
Server running on port 5000
⚛️ Frontend Setup

Open another terminal.

Go to:

cd frontend

Install dependencies:

npm install

Start React:

npm run dev

The frontend should run on:

http://localhost:5173
🌐 Frontend Pages

The application contains three main pages.

Register
/register

Example:

http://localhost:5173/register

Users can create a new account.

Login
/login

Example:

http://localhost:5173/login

Users can login using their email and password.

Dashboard
/dashboard

Example:

http://localhost:5173/dashboard

The Dashboard is protected and can only be accessed by authenticated users.

🔗 API Endpoints
Authentication Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/auth/refresh	Generate new access token
POST	/api/auth/logout	Logout user
User Routes
Method	Endpoint	Authentication
GET	/api/users/profile	Required
👤 Register API
Request
POST http://localhost:5000/api/auth/register

Body:

{
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "Test@12345"
}
Expected Response
{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Nikhil",
    "email": "nikhil@test.com"
  }
}

Status:

201 Created
🔑 Login API
Request
POST http://localhost:5000/api/auth/login

Body:

{
  "email": "nikhil@test.com",
  "password": "Test@12345"
}
Response
{
  "message": "Login successful",
  "accessToken": "ACCESS_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Nikhil",
    "email": "nikhil@test.com"
  }
}

The Refresh Token is sent as an HttpOnly Cookie.

👤 Protected Profile API
Request
GET http://localhost:5000/api/users/profile

Header:

Authorization: Bearer ACCESS_TOKEN
Response
{
  "message": "Protected profile",
  "user": {
    "id": "USER_ID",
    "email": "nikhil@test.com"
  }
}
🔄 Refresh Token API
Request
POST http://localhost:5000/api/auth/refresh

The Refresh Token is automatically sent through the HttpOnly Cookie.

No request body is required.

Response
{
  "accessToken": "NEW_ACCESS_TOKEN"
}
🚪 Logout API
Request
POST http://localhost:5000/api/auth/logout
Response
{
  "message": "Logout successful"
}

After logout:

Refresh Token is invalidated
Refresh Token cookie is cleared
React authentication state is cleared
User is redirected to Login
🧪 Thunder Client Testing

Thunder Client can be used to test the backend before connecting React.

Create a collection:

JWT Authentication

Add these requests:

JWT Authentication
│
├── 01 Register
├── 02 Login
├── 03 Get Profile
├── 04 Refresh Token
├── 05 Logout
├── 06 Refresh After Logout
├── 07 Login Wrong Password
├── 08 Profile Without Token
└── 09 Profile Invalid Token
🧪 Test 1 — Register

Request:

POST http://localhost:5000/api/auth/register

Body:

{
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "Test@12345"
}

Expected:

201 Created
🧪 Test 2 — Login

Request:

POST http://localhost:5000/api/auth/login

Body:

{
  "email": "nikhil@test.com",
  "password": "Test@12345"
}

Expected:

200 OK

You should receive:

Access Token

and:

Refresh Token Cookie
🧪 Test 3 — Get Profile

Request:

GET http://localhost:5000/api/users/profile

Header:

Authorization: Bearer YOUR_ACCESS_TOKEN

Expected:

200 OK
🧪 Test 4 — Profile Without Token

Remove the Authorization header.

Request:

GET http://localhost:5000/api/users/profile

Expected:

401 Unauthorized
🧪 Test 5 — Invalid Access Token

Use:

Authorization: Bearer abc123

Expected:

401 Unauthorized
🧪 Test 6 — Refresh Token

After the Access Token expires:

POST http://localhost:5000/api/auth/refresh

Expected:

200 OK

Response:

{
  "accessToken": "NEW_ACCESS_TOKEN"
}
🧪 Test 7 — Use New Access Token

Use the new token:

GET http://localhost:5000/api/users/profile

Header:

Authorization: Bearer NEW_ACCESS_TOKEN

Expected:

200 OK
🧪 Test 8 — Logout

Request:

POST http://localhost:5000/api/auth/logout

Expected:

200 OK
🧪 Test 9 — Refresh After Logout

Request:

POST http://localhost:5000/api/auth/refresh

Expected:

401 Unauthorized

This confirms that the Refresh Token has been invalidated.

🔄 Automatic Access Token Refresh

The React application uses an Axios Response Interceptor.

When a protected API returns 401:

API Request
     │
     ▼
Access Token
     │
     ▼
Backend
     │
     ▼
401 Unauthorized
     │
     ▼
Axios Interceptor
     │
     ▼
POST /auth/refresh
     │
     ▼
Refresh Token Cookie
     │
     ▼
Backend validates Refresh Token
     │
     ▼
New Access Token
     │
     ▼
Retry Original Request
     │
     ▼
200 OK

The user does not need to login again as long as the Refresh Token is valid.

🛡️ Protected Route

The Dashboard uses a protected route.

User
 │
 ▼
/dashboard
 │
 ▼
ProtectedRoute
 │
 ├── Authenticated
 │       │
 │       ▼
 │   Dashboard
 │
 └── Not Authenticated
         │
         ▼
       /login
📱 React Authentication Flow
/register
    │
    ▼
Register.jsx
    │
    ▼
POST /auth/register
    │
    ▼
MongoDB
    │
    ▼
/login
    │
    ▼
Login.jsx
    │
    ▼
POST /auth/login
    │
    ├───────────────┐
    ▼               ▼
Access Token   Refresh Token
    │               │
    ▼               ▼
React Memory   HttpOnly Cookie
    │
    ▼
/dashboard
    │
    ▼
Protected API
🔐 Token Storage
Access Token

The Access Token is stored in React memory.

It is used in:

Authorization: Bearer ACCESS_TOKEN

It is intentionally not stored in localStorage in this implementation.

Refresh Token

The Refresh Token is stored in an:

HttpOnly Cookie

React cannot directly read it using:

document.cookie

The browser automatically sends it to the backend when:

withCredentials: true

is enabled.

🍪 Refresh Token Cookie

The backend should create the Refresh Token cookie with security settings similar to:

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

For production, use HTTPS and configure cookie attributes according to your deployment architecture.

🔒 Password Security

Passwords are never stored as plain text.

Example:

User enters:

Test@12345

Backend:

bcrypt.hash()
      ↓
$2b$10$xxxxxxxxxxxxxxxx

MongoDB stores:

{
  "password": "$2b$10$xxxxxxxxxxxxxxxx"
}

It should never store:

{
  "password": "Test@12345"
}
🧠 Authentication Lifecycle
1. Registration
User
 ↓
Register Form
 ↓
POST /register
 ↓
Validate Data
 ↓
Hash Password
 ↓
Save User
 ↓
MongoDB
2. Login
User
 ↓
Login Form
 ↓
POST /login
 ↓
Find User
 ↓
Compare Password
 ↓
Generate Access Token
 ↓
Generate Refresh Token
 ↓
Access Token → React Memory
Refresh Token → HttpOnly Cookie
3. Protected API
React
 ↓
Access Token
 ↓
Authorization Header
 ↓
JWT Middleware
 ↓
Verify Token
 ↓
Protected Controller
 ↓
Response
4. Access Token Expiration
API Request
 ↓
Access Token Expired
 ↓
401 Unauthorized
 ↓
Axios Interceptor
 ↓
POST /refresh
 ↓
Refresh Token Cookie
 ↓
Verify Refresh Token
 ↓
Generate New Access Token
 ↓
Retry Original Request
5. Logout
Logout
 ↓
POST /logout
 ↓
Invalidate Refresh Token
 ↓
Clear Cookie
 ↓
Clear React State
 ↓
Redirect to Login
🧪 Testing Access Token Expiration

For testing, temporarily set:

ACCESS_TOKEN_EXPIRES=30s
REFRESH_TOKEN_EXPIRES=10m

Restart the backend.

Login:

/login

Then access:

/dashboard

Immediately:

GET /api/users/profile

should return:

200 OK

Wait approximately 30–40 seconds.

Call the protected API again.

You should see:

GET /users/profile → 401
        ↓
POST /auth/refresh → 200
        ↓
GET /users/profile → 200

This confirms that automatic token refresh is working.

🌐 Axios Configuration

The Axios instance is responsible for:

Adding the Access Token to requests
Detecting 401
Calling /refresh
Receiving a new Access Token
Retrying the original request

Example:

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
🐛 Common Problems
ERR_CONNECTION_REFUSED

If you see:

POST http://localhost:5000/api/auth/register
net::ERR_CONNECTION_REFUSED

Check:

npm run dev

Make sure the backend is running on:

http://localhost:5000

If Thunder Client also cannot connect, the problem is with the backend/server.

🐛 CORS Error

Make sure the backend allows:

http://localhost:5173

and Axios has:

withCredentials: true

Example:

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
🐛 Refresh Token Not Working

Check:

Backend
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax"
});
Frontend
withCredentials: true
CORS
cors({
  origin: "http://localhost:5173",
  credentials: true
})
🔐 Environment Variables

Never commit:

.env

to GitHub.

Add this to .gitignore:

node_modules/
.env
.env.local
dist/
build/
🚫 Never Commit Secrets

Never upload:

MONGO_URI
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
Database Password
API Keys
Private Keys

to GitHub.

Use environment variables instead.

📊 Database User Document

After registration:

{
  "_id": "USER_ID",
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "$2b$10$...",
  "refreshToken": null
}

After login:

{
  "_id": "USER_ID",
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "$2b$10$...",
  "refreshToken": "..."
}

After logout:

{
  "_id": "USER_ID",
  "name": "Nikhil",
  "email": "nikhil@test.com",
  "password": "$2b$10$...",
  "refreshToken": null
}

For production, it is better to store a hash of the refresh token rather than the raw refresh token and implement refresh-token rotation.

🎨 Frontend UI

The application contains:

Register Page
┌───────────────────────────────┐
│        Create Account         │
│                               │
│  Name                         │
│  ┌─────────────────────────┐  │
│  │ Enter your name         │  │
│  └─────────────────────────┘  │
│                               │
│  Email                        │
│  ┌─────────────────────────┐  │
│  │ Enter your email        │  │
│  └─────────────────────────┘  │
│                               │
│  Password                     │
│  ┌─────────────────────────┐  │
│  │ Create a password       │  │
│  └─────────────────────────┘  │
│                               │
│  ┌─────────────────────────┐  │
│  │     Create Account      │  │
│  └─────────────────────────┘  │
│                               │
│ Already have an account?     │
│ Login                         │
└───────────────────────────────┘
Login Page
┌───────────────────────────────┐
│         Welcome Back          │
│                               │
│  Email                        │
│  ┌─────────────────────────┐  │
│  │ Enter your email        │  │
│  └─────────────────────────┘  │
│                               │
│  Password                     │
│  ┌─────────────────────────┐  │
│  │ Enter your password     │  │
│  └─────────────────────────┘  │
│                               │
│  ┌─────────────────────────┐  │
│  │          Login          │  │
│  └─────────────────────────┘  │
│                               │
│ Don't have an account?        │
│ Create Account                │
└───────────────────────────────┘
Dashboard
┌─────────────────────────────────────────┐
│ JWT Auth                         Logout  │
├─────────────────────────────────────────┤
│                                         │
│ Welcome, Nikhil 👋                      │
│ You are successfully authenticated.     │
│                                         │
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ Your Profile    │ │ Authentication  │ │
│ │                 │ │                 │ │
│ │ Name: Nikhil    │ │ ✓ Authenticated │ │
│ │ Email: ...      │ │                 │ │
│ │ User ID: ...    │ │ Access Token ✓  │ │
│ └─────────────────┘ └─────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Protected API                       │ │
│ │                                     │ │
│ │ API User ID: ...                    │ │
│ │ API Email: ...                      │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
🚀 Future Improvements

Possible improvements for production:

Refresh Token Rotation
Hashed Refresh Tokens
Refresh Token Reuse Detection
Email Verification
Forgot Password
Reset Password
Role-Based Authorization
Admin Dashboard
Google OAuth
Two-Factor Authentication
Rate Limiting
CSRF Protection
Helmet Security Headers
Request Validation
Account Lockout
Login Attempt Tracking
Email Notifications
📚 Learning Objectives

This project demonstrates:

JWT Authentication
Access Tokens
Refresh Tokens
HttpOnly Cookies
Password Hashing
bcrypt
Express Middleware
JWT Middleware
React Context API
Axios Interceptors
Protected Routes
Automatic Token Refresh
MongoDB Authentication
REST APIs
CORS
Cookie-Based Authentication
Authentication State Management
👨‍💻 Author
Nikhil Dadhich

Full Stack Developer | MERN Stack

Technologies
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
⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

📄 License

This project is created for learning and demonstration purposes.


Save that as:

```text
README.md

Then from your project root:

git add README.md
git commit -m "Add JWT authentication README"
git push origin main

If your branch is master, use:

git push origin master                        