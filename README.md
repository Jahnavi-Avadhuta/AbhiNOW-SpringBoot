<div align="center">

# 🚗 AbhiNOW  
### *Saath chalein? Abhi?*

A **full-stack ride-sharing & carpooling platform** built for **Hyderabad's daily commuters and students**.

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.14-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth2-Login-4285F4?style=for-the-badge&logo=google&logoColor=white)

> **AbhiNOW is a community-driven ride-sharing platform designed for recurring daily travel rather than one-time rides.**

[✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📸 Screenshots](#-screenshots) • [🚀 Setup](#-getting-started)

</div>

---

# 💡 What is AbhiNOW?

AbhiNOW is a **ride-sharing & carpooling platform** built specifically for **Hyderabad's daily commuters and students**.

Unlike Uber or Rapido which focus on **one-time rides**, AbhiNOW is designed around **daily recurring travel routes**.

### Example Route

```text
Miyapur → Ameerpet → Hitech City
````

Passengers traveling on the same route can join the ride daily.

### Why AbhiNOW?

✅ Affordable daily travel
✅ Trusted recurring commuters
✅ Reduced traffic congestion
✅ Better ride-sharing experience

---

# ✨ Features

## 🎒 Passenger Features

* 🔍 Search rides by pickup & destination
* 📍 Live ride tracking
* ⭐ Driver ratings & reviews
* 🧾 Ride history & invoices
* 🚗 View driver details before booking
* 📱 OTP verification during registration

---

## 🚗 Driver Features

* 🗺️ Post rides with source & destination
* 📨 Accept / reject ride requests
* 📍 Share live location
* 💰 View earnings
* 🚘 Manage completed rides

---

## ⚙️ Admin Features

* 👥 User management
* 🚫 Suspend / Unsuspend users
* 🚗 Monitor rides
* ⭐ Moderate ratings
* 📍 Manage locations
* 📊 Dashboard analytics

---

## 🔐 Authentication & Security

* 🔑 JWT Authentication
* 🌐 Google OAuth Login
* 📱 Twilio OTP Verification
* 🔒 BCrypt Password Encryption
* 🛡️ Role-Based Authorization

---

## 🗺️ Real-Time Features

* 🗺️ Google Maps Integration
* 📍 Live Driver Tracking
* ⚡ WebSocket Communication
* 🛰️ Satellite View
* 📌 Route Visualization

---

# 🛠️ Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* WebSockets
* Twilio API
* Google OAuth2
* Docker

## Frontend

* React.js
* React Router
* Axios
* Google Maps API
* STOMP + SockJS
* JWT Decode

---

# 🏗️ Architecture

```text
React Frontend
       ↓ REST API + JWT
Spring Boot Backend
       ↓ JPA / Hibernate
MySQL Database
```

### Real-Time Flow

```text
Driver App
     ↓
 WebSocket
     ↓
 Spring Broker
     ↓
 Passenger Live Tracking
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

![Tracking](screenshots/live-tracking.png)

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

Add your credentials:

```yaml
spring:
  datasource:
    username: root
    password: root

jwt:
  secret: YOUR_SECRET

twilio:
  account-sid: YOUR_ACCOUNT_SID
  auth-token: YOUR_AUTH_TOKEN

google:
  client-id: YOUR_CLIENT_ID
  client-secret: YOUR_CLIENT_SECRET
```

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
* [ ] Mobile App
* [ ] Cloud Deployment

---

# 👩‍💻 Developer

**Jahnavi Avadhuta**

Built with ❤️ using **Spring Boot + React**

---

<div align="center">

### ⭐ Star this repository if you like the project ⭐

</div>
