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