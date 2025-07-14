# UniForum - Frontend

This is the frontend of the **UniForum** project, a university forum platform built with **React.js** and **Tailwind CSS**. It connects with backend microservices to allow access, posting, viewing, and voting on academic topics.

---

## 🚀 Technologies Used

- [React.js](https://reactjs.org/) – JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework.
- [Vite](https://vitejs.dev/) – Fast frontend build tool (if used).
- [Axios](https://axios-http.com/) – HTTP client for API communication.
- React Context – For global state management.

---

## 📁 Project Structure

```
frontend/
├── src/
│ ├── api/ # Logic to connect to backend services (fetch/axios)
│ ├── context/ # Global context files (user, topics, auth, etc.)
│ ├── hooks/ # Custom reusable hooks
│ ├── pages/ # Main views (Home, Login, Forum, etc.)
│ ├── App.jsx # Root component
│ ├── main.jsx # React entry point
│ ├── index.css # Global styles
├── index.html # Base HTML
├── package.json # Dependencies and scripts
├── tailwind.config.js # Tailwind configuration

```
---

## ⚙️ Installation and Running

1. Clone the repository:
```bash
git clone https://github.com/AndyAlarconldu/uniforum-project.git
cd uniforum-project/frontend

Install dependencies:
npm install

Run the development server:
npm run dev
