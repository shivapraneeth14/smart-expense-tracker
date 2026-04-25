# 💰 Smart Expense Tracker (Full Stack)

A full-stack Expense Tracker application built using **React Native (Expo)** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login with JWT)
- ➕ Add, edit, and delete expenses
- 📊 Dashboard with total and category-wise expense summary
- 📅 Date picker for selecting expense date
- ✅ Form validation and error handling
- 🔄 Real-time data fetching
- 📱 Clean and modern UI (React Native)

---

## 🛠️ Tech Stack

### Frontend
- React Native (Expo)
- Axios
- React Navigation
- DateTimePicker

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure


smart-expense-tracker/
│
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
├── Frontend/
│ ├── src/
│ │ ├── screens/
│ │ ├── services/
│ │ └── navigation/
│ └── .env
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/shivapraneeth14/smart-expense-tracker.git
cd smart-expense-tracker
2️⃣ Backend Setup
cd Backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd Frontend
npm install

Create .env file:

EXPO_PUBLIC_API_URL=http://localhost:5000/api

Run frontend:

npx expo start --web
🌐 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Expenses
GET /api/expenses
POST /api/expenses
PUT /api/expenses/:id
DELETE /api/expenses/:id
🧠 Key Highlights
Secure authentication using JWT
Password hashing using bcrypt
Protected routes using middleware
Clean and modular folder structure
Environment-based configuration
📌 Future Improvements
📊 Charts for expense visualization
🗂️ Category dropdown selection
🔔 Notifications
☁️ Deployment (Render / Vercel)
👨‍💻 Author

Shiva Praneeth

GitHub: https://github.com/shivapraneeth14
⭐ If you like this project

Give it a star ⭐ on GitHub!
