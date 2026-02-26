# 🚀 Real-Time Chat Application

A full-stack **Real-Time Chat Application** built using the **MERN stack** with **Socket.io** that allows users to communicate instantly with authentication, real-time messaging, and modern UI.

---

## 🧩 Features

- 🔐 User Authentication (Signup & Login)
- 💬 Real-time messaging using Socket.io
- 🟢 Online / Offline user status
- 👤 User profiles
- 🧠 Persistent chat history (MongoDB)
- 🎨 Modern UI with React & Tailwind CSS
- ⚡ Fast and scalable backend with Node.js & Express

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Zustand (state management)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication

---

## 📁 Project Structure
fullstack-chat-app-master/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ ├── middleware/
│ │ └── index.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── store/
│ │ └── App.jsx
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vishalcode03/Real-time-chat.git
cd Real-time-chat

cd backend
npm install

PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start

cd frontend
npm install
npm run dev
