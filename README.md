<div align="center">

# 🚗 AbhiNOW
### *Saath chalein? Abhi?*

A **full-stack ride-sharing & carpooling platform** designed for **daily commuters and students**.

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.14-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> **AbhiNOW is a community-driven ride-sharing platform designed around recurring daily travel.**

[✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🏗️ Architecture](#️-architecture) • [📸 Screenshots](#-screenshots) • [🚀 Setup](#-getting-started)

</div>

---

# 💡 What is AbhiNOW?

AbhiNOW is a **full-stack ride-sharing and carpooling platform** designed for daily commuters and students.

The platform focuses on recurring travel routes, allowing users travelling along similar routes to connect and share rides.

### Example Route

```text
Miyapur → Ameerpet → Hitech City
```

Passengers and drivers travelling along similar routes can use the platform to coordinate their daily travel.

### Why AbhiNOW?

* 💰 Affordable daily travel
* 🤝 Recurring ride-sharing
* 🚗 Convenient ride coordination
* 🌱 Potential to reduce individual vehicle usage
* 📍 Route-based ride discovery

---

# ✨ Features

## 🎒 Passenger Features

* 🔍 Search rides by pickup and destination
* 📍 Track ride information
* ⭐ View driver ratings and reviews
* 🧾 View ride history
* 🚗 View driver details before booking
* 📱 OTP verification during registration

---

## 🚗 Driver Features

* 🗺️ Post rides with source and destination
* 📨 Accept or reject ride requests
* 📍 Share live location
* 💰 View earnings
* 🚘 Manage completed rides
* 📋 Manage posted rides

---

## ⚙️ Admin Features

* 👥 User management
* 🚫 Suspend and unsuspend users
* 🚗 Monitor rides
* ⭐ Manage ratings
* 📍 Manage locations
* 📊 View dashboard information

---

# 🔐 Authentication & Security

* 🔑 JWT Authentication
* 🌐 Google OAuth2 Login
* 📱 Twilio OTP Verification
* 🔒 BCrypt Password Encryption
* 🛡️ Role-Based Authorization

---

# 🗺️ Real-Time Features

* 🗺️ Google Maps Integration
* 📍 Live Driver Tracking
* ⚡ WebSocket Communication
* 🛰️ Satellite Map View
* 📌 Route Visualization

---

# 🛠️ Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* MySQL
* WebSockets
* Maven

## Frontend

* React.js
* React Router
* Axios
* Google Maps API
* STOMP
* SockJS
* JWT Decode

## Additional Technologies

* Twilio API
* Google OAuth2
* Docker

---

# 🏗️ Architecture

```text
                    React Frontend
                          │
                          │ REST API + JWT
                          ▼
                  Spring Boot Backend
                          │
                    JPA / Hibernate
                          │
                          ▼
                    MySQL Database
```

### Real-Time Communication

```text
Driver
   │
   │ WebSocket
   ▼
Spring Boot
   │
   │ Real-Time Updates
   ▼
Passenger
```

---

# 📸 Screenshots

## 🏠 Home Page

![Home](screenshots/HomePage1.png)

---

## 🔐 Login Page

![Login](screenshots/login-page.png)

---

## 📝 Register Page

![Register](screenshots/register-page.png)

---

## 📱 OTP Verification

![OTP](screenshots/otp-verification.png)

---

## 📊 Dashboard

![Dashboard](screenshots/dashboard-page.png)

---

## 🚗 Post Ride

![Post Ride](screenshots/post-ride.png)

---

## 🔍 Search Ride

![Search Ride](screenshots/search-ride.png)

---

## 🚘 Passenger Dashboard

![Passenger Dashboard](screenshots/passenger-dashboard.png)

---

## 📍 Live Tracking

![Live Tracking](screenshots/live-tracking.png)

---

## 🛰️ Satellite View

![Satellite](screenshots/satellite-view.png)

---

## 🚕 Driver Rides

![Driver Rides](screenshots/driver-rides.png)

---

## 📨 Ride Requests

![Ride Requests](screenshots/ride-requests.png)

---

## ⚙️ Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

---

## 👥 Admin User Management

![Admin Users](screenshots/admin-users-control.png)

---

## 🛠️ Admin Panel

![Admin Panel](screenshots/admin-panel.png)

---

# 🚀 Getting Started

## Prerequisites

Install:

* Java 21+
* Node.js
* MySQL 8+
* Maven
* Docker (optional)

---

## 1. Clone Repository

```bash
git clone https://github.com/Jahnavi-Avadhuta/AbhiNOW-SpringBoot.git
cd AbhiNOW-SpringBoot
```

---

## 2. Create Database

```sql
CREATE DATABASE abhinow_spring;
```

---

## 3. Configure Application

Update:

```text
src/main/resources/application.yaml
```

Add your local credentials and API configuration:

```yaml
spring:
  datasource:
    username: root
    password: YOUR_DATABASE_PASSWORD

jwt:
  secret: YOUR_JWT_SECRET

twilio:
  account-sid: YOUR_ACCOUNT_SID
  auth-token: YOUR_AUTH_TOKEN

google:
  client-id: YOUR_CLIENT_ID
  client-secret: YOUR_CLIENT_SECRET
```

> ⚠️ Never commit real passwords, API keys, secrets, or credentials to GitHub.

---

## 4. Run Backend

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## 5. Run Frontend

```bash
cd abhinow-frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000
```

---

# 📡 Important APIs

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | `/api/auth/register`           |
| POST   | `/api/auth/login`              |
| POST   | `/api/otp/send`                |
| POST   | `/api/otp/verify`              |
| GET    | `/oauth2/authorization/google` |

---

# 🌟 Future Improvements

* [ ] Women-only rides
* [ ] Payment Gateway Integration
* [ ] Subscription Plans
* [ ] Smart Route Matching
* [ ] Mobile Application
* [ ] Cloud Deployment

---

# 👩‍💻 Developer

**Jahnavi Avadhuta**

B.Tech - Computer Science and Engineering

[Portfolio](https://portfolio-website-zeta-blond-34.vercel.app/)  
[LinkedIn](https://www.linkedin.com/in/jahnavi-avadhuta-879b4232b/)  
[GitHub](https://github.com/Jahnavi-Avadhuta)

---

<div align="center">

### ⭐ Star this repository if you like the project ⭐

</div>
