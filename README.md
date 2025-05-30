# 🏫 School Vaccination Portal – Frontend

This is the **ReactJS frontend** for the **School Vaccination Portal**, designed to manage student vaccination drives at schools. It’s built with ❤️ using:

- ⚛️ ReactJS
- 🧠 Redux for state management
- 🎯 Redux-Saga for async API calls
- 🎨 SCSS for modular styles
- 🔐 JWT-based token auth
- 🚦 React Router for navigation

---

## 🚀 Live Features

- ✅ Dark UI
- 🔐 **Login Authentication** (token-based)
- 🎨 **Responsive Layout** with sidebar navigation
- 📊 **Dashboard Analytics** with Pie Charts and Drive Status
- 🧑‍🎓 **Student Management**
  - List students with vaccination status
  - Bulk student upload via CSV
  - Mark students as vaccinated in ongoing drives
  - Class-based vaccination filtering
- 💉 **Drive Management**
  - Create & edit drives with future-date validation
  - Track drive status: `expired`, `upcoming`, `in-progress`
  - Filter drives by name, date, and status
- 🔍 **Search & Filters** for students and drives

---

## 📁 Project Structure

The project is organized as follows:

```
frontend/
├── public/                 # Static files (HTML, images, etc.)
├── src/
│   ├── assets/             # Images, icons, and other assets
│   ├── components/         # Reusable React components (e.g., Sidebar, Header)
│   ├── pages/              # Page components (e.g., Login, Dashboard, Students)
│   ├── redux/              # Redux setup (actions, reducers, sagas, store)
        ├── actions.js/
        ├── reducer.js/
        ├── saga.js/
        ├── types.js/
│   ├── styles/             # SCSS files for styling
│   ├── utils/              # Utility functions and helpers
│   ├── App.jsx             # Main app component
│   ├── index.js            # Entry point for React
│   └── routes.js           # Route definitions for the app
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

### Key Folders:

- **`components/`**: Contains reusable UI components like the Sidebar and Header.
- **`pages/`**: Contains page-level components like Login, Dashboard, and Students.
- **`redux/`**: Manages application state using Redux and Redux-Saga.
- **`styles/`**: Contains SCSS files for modular and reusable styles.

---

# 🧑‍💻 Setup Instructions

### 1️⃣ Clone & Install

```bash
git clone https://github.com/yourusername/vaccine-portal-frontend.git
cd frontend
npm install
```

### 2️⃣ Set Custom Port

```bash
server: {
  port: 8080
}
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

---

## 🛠️ Tech Highlights

| Technology          | Description                                         |
| ------------------- | --------------------------------------------------- |
| ⚛️ **ReactJS**      | Frontend library for building user interfaces       |
| 🧠 **Redux**        | State management for predictable application state  |
| 🎯 **Redux-Saga**   | Middleware for handling side effects like API calls |
| 🎨 **SCSS**         | CSS preprocessor for modular and reusable styles    |
| 🔐 **JWT Auth**     | Secure authentication using JSON Web Tokens         |
| 🚦 **React Router** | Client-side routing for navigation                  |
| 🌐 **Axios**        | Promise-based HTTP client for API requests          |
| 🛡️ **ESLint**       | Linting tool for maintaining code quality           |
| 📦 **Webpack**      | Module bundler for optimizing the build process     |

### Why These Technologies?

- **ReactJS**: For building a dynamic and responsive user interface.
- **Redux & Redux-Saga**: To manage complex state and handle asynchronous operations.
- **SCSS**: To write clean, maintainable, and reusable styles.
- **JWT Auth**: To ensure secure login and session management.
- **React Router**: To enable seamless navigation between pages.

---

## 📷 Screenshots

### 🔐 Login View

![alt text](screenshots/login.png)

### 🏠 Dashboard View

![alt text](screenshots/DashboardPage.png)

### 🧑‍🎓 Student Management

![alt text](screenshots/StudentPage.png)

#### ✅ Mark Student Vaccinated

![alt text](screenshots/MarkingStudentVaccinated.png)

### 💉 Drive Management

![alt text](screenshots/DrivePage.png)

#### ✏️ Edit Drive

![alt text](screenshots/EditDrive.png)

---

## ✍️ Author

**Ashish Pathak**  
2024TM93035@wilp.bits-pilani.co.in <br />
[GitHub](https://github.com/ashish010598)

## 📝 License

This project is for educational purpose only. Made for Assignment submission for Course: **Full Stack App Development**
