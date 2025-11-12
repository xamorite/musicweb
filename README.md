## 🎵 Musix - The Fan-Centric Music Streaming Platform

Musix is a modern music streaming platform built to **enhance the connection between artists and their dedicated fanbase**. We leverage the extensive audio catalog of the **Adious API** and provide a secure, scalable backend using **Java** to manage user data and authentication.

---

## ✨ Features

* **Vast Music Library:** Stream millions of tracks powered by the **Adious API**.
* **Secure User Management:** Robust user authentication and data storage via a **Java backend**.
* **Fan Engagement:** Features designed specifically to foster a strong artist-fan community (details coming soon in future updates!).
* **Sleek User Interface:** A fast, responsive, and modern user experience built with **Next.js** and styled with **Tailwind CSS**.

---

## 💻 Tech Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **Next.js** | React framework for server-side rendering and static site generation. |
| **Tailwind CSS** | Utility-first CSS framework for rapid and consistent styling. |

### Backend & Services
| Technology | Description |
| :--- | :--- |
| **Java** | Core language for the backend, handling business logic, user data, and authentication. |
| **Adious API** | Third-party service used for accessing the music and audio content library. |
| **Database** | **PostgreSQL** for persistent storage of user profiles and authentication tokens. |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (LTS recommended)
* **Java Development Kit (JDK)** (Version 17+ recommended)
* **Adious API Key** (Required for streaming data)
* **PostgreSQL** (Installed and running locally or accessible via a service)

### 1. Backend Setup (Java)

1.  Navigate to the `backend/` directory.
2.  Configure your **PostgreSQL** connection details and **Adious API key** in the appropriate configuration files (e.g., `application.properties` or `application.yml`).
3.  Build and run the Java application:
    ```bash
    # Example command (may vary based on your Java framework, e.g., Spring Boot)
    ./mvnw spring-boot:run
    ```
    The backend should start, typically running on `http://localhost:8080`.

---

### 2. Frontend Setup (Next.js)

1.  Navigate to the `frontend/` directory.
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a **`.env.local`** file in the `frontend/` directory and add the environment variables, including the backend API URL:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
    ```
4.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will be accessible at `http://localhost:3000`.

---

## 🤝 Contribution

We welcome contributions! Please check out our `CONTRIBUTING.md` for guidelines on how to submit pull requests, report bugs, and suggest features.

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
