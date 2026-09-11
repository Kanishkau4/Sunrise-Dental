<div align="center">

# 🦷 Sunrise Dental Clinic Management System

**A modern, secure, full-stack healthcare web application designed to streamline appointment scheduling, patient tracking, staff management, and billing workflows.**

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-documentation">API Reference</a> •
  <a href="#-license">License</a>
</p>

<!-- Tech Stack Badges -->
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📌 Overview

**Sunrise Dental Clinic** modernizes day-to-day dental practice administration. From front-desk patient reception to treatment billing, it replaces fragmented physical registers and disjointed spreadsheets with a fast, responsive, and role-secured platform.

```
                  ┌────────────────────────┐
                  │    React 19 + Vite     │
                  │  (Tailwind CSS, Axios) │
                  └───────────┬────────────┘
                              │  REST / JWT
                              ▼
                  ┌────────────────────────┐
                  │     Spring Boot 3      │
                  │  (Spring Security +    │
                  │   Data JPA / JJWT)     │
                  └───────────┬────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       ┌───────────────┐             ┌───────────────┐
       │  H2 Database  │             │  PostgreSQL   │
       │  (In-Memory)  │             │ (Production)  │
       └───────────────┘             └───────────────┘
```

---

## ✨ Key Features

- 🔐 **JWT-Based Authentication & Role Guard**: Protected routes with token refresh, password hashing via BCrypt, and secure session management.
- 📅 **Dynamic Appointment Scheduling**: Real-time slot bookings with quick validation against doctor availability.
- 🔍 **Live Search & Filter**: Instant appointment retrieval by patient name, contact info, or treatment date.
- 💳 **Integrated Billing & Invoicing**: Automated treatment cost computation with printable billing breakdowns.
- 👥 **Staff Management Hub**: Role allocation for receptionists, hygienists, and dentists.
- ⚡ **High-Performance UI**: Sub-millisecond reactive components powered by React 19 and Tailwind CSS v4.
- 🗄️ **Dual Database Support**: Zero-config H2 for local dev/testing, with native configuration for PostgreSQL in production.

---

## 🛠️ Tech Stack

<details>
<summary><b>Frontend Technologies</b></summary>

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core reactive UI library |
| **Vite 8** | Next-gen blazing fast frontend build tool |
| **Tailwind CSS 4** | Utility-first modern responsive styling |
| **React Router 7** | Single Page Application (SPA) client-side routing |
| **Axios** | Interceptor-configured HTTP client for API calls |
| **Oxlint** | High-speed JavaScript/JSX code linter |

</details>

<details>
<summary><b>Backend Technologies</b></summary>

| Technology | Purpose |
| :--- | :--- |
| **Java 21 (LTS)** | Modern virtual threads and core runtime |
| **Spring Boot 3.3.4** | Standalone production-grade REST framework |
| **Spring Security** | Fine-grained endpoint authorization |
| **JJWT 0.12.6** | Robust JSON Web Token signing & validation |
| **Spring Data JPA & Hibernate** | Object-Relational Mapping & repository layer |
| **H2 / PostgreSQL** | Multi-environment database persistence |
| **Lombok** | Boilerplate reduction for models and DTOs |
| **JUnit 5 & Mockito** | Automated unit & integration testing |

</details>

---

## 📁 Repository Structure

```plaintext
Dental Clinic/
├── .github/
│   └── workflows/
│       └── maven.yml          # GitHub Actions CI pipeline
├── Backend/                   # Spring Boot 3 REST API
│   ├── src/main/java/com/sunrise/dentalclinic/
│   │   ├── config/            # SecurityFilterChain, CORS, JWT interceptors
│   │   ├── controller/        # REST controllers (Auth, Appointments, Staff, etc.)
│   │   ├── dto/               # Request & response data payloads
│   │   ├── exception/         # Centralized GlobalExceptionHandler
│   │   ├── model/             # JPA entity definitions
│   │   ├── repository/        # Spring Data repositories
│   │   └── service/           # Core clinical and billing logic
│   └── pom.xml
└── Frontend/                  # React 19 SPA
    ├── src/
    │   ├── api/               # Axios services with auth headers
    │   ├── components/        # UI components (Navbar, Modal, ProtectedRoute)
    │   ├── context/           # AuthContext & state providers
    │   ├── layouts/           # StaffLayout, Dashboard wrappers
    │   └── pages/             # App views (Home, Dashboard, Register, Search, Staff)
    ├── package.json
    └── vite.config.js
```

---

## ⚡ Quick Start

### Prerequisites
- **JDK 21** or later installed
- **Node.js 18+** & **npm**
- **Git**

---

### 1. Clone the Repository
```bash
git clone https://github.com/Kanishkau4/Sunrise-Dental.git
cd Sunrise-Dental
```

---

### 2. Backend Setup
```bash
cd Backend

# Run using the Maven Wrapper (Linux/macOS)
./mvnw spring-boot:run

# Or on Windows PowerShell:
.\mvnw.cmd spring-boot:run
```

- Backend REST API: `http://localhost:8080`
- H2 In-Memory DB Console: `http://localhost:8080/h2-console` *(JDBC URL: `jdbc:h2:mem:dentaldb`)*

---

### 3. Frontend Setup
```bash
# In a new terminal window:
cd Frontend

# Install node packages
npm install

# Start Vite dev server
npm run dev
```

- Access frontend at: `http://localhost:5173`

---

## 🔐 API Documentation (Core Endpoints)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/login` | Staff / Admin authentication | ❌ |
| `GET` | `/api/appointments` | List all scheduled appointments | ✅ |
| `POST` | `/api/appointments` | Register new patient appointment | ✅ |
| `GET` | `/api/appointments/search` | Query appointments by name/phone/date | ✅ |
| `POST` | `/api/billing/calculate` | Compute billing breakdown for treatments | ✅ |
| `POST` | `/api/staff` | Create new clinic staff account | 🛡️ Admin |

---

## 🧪 Testing

To run the automated backend test suites (JUnit 5 & Mockito):

```bash
cd Backend
./mvnw test
```

---

## 🤝 Contributing

Contributions make open-source amazing. Any feedback or improvements are greatly appreciated!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Kanishkau4">Kanishkau4</a> for modern healthcare operations.</sub>
</div>
