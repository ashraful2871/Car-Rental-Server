Here’s your **README** file for the **backend**, including **MongoDB setup, JWT authentication, and Vercel deployment**.

````markdown
# 🚗 Car Rent Platform - Backend

This is the **backend API** for the Car Rent Platform, built using **Node.js, Express.js, MongoDB, and JWT authentication**.

🚀 **Live API URL:** [Backend Deployed on Vercel](https://your-backend.vercel.app/)

---

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Database Configuration](#database-configuration)
- [JWT Authentication](#jwt-authentication)
- [Deploy on Vercel](#deploy-on-vercel)
- [Dependencies](#dependencies)
- [License](#license)

---

## 🚀 Features

✅ **User Authentication using JWT**  
✅ **Secure API endpoints**  
✅ **MongoDB as database**  
✅ **Manage car rental data**  
✅ **Cross-Origin Resource Sharing (CORS) enabled**  
✅ **Environment variables for security**

---

## 🛠 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/car-rental-backend.git
   cd car-rental-backend
   ```
````

2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Add environment variables** (see below).
4. **Start the server:**
   ```sh
   node index.js
   ```
   or use **nodemon** for development:
   ```sh
   npm install -g nodemon
   nodemon index.js
   ```
5. **Backend should now be running on:**
   ```
   http://localhost:5000
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the root folder and add:

```sh
USER_DB=assignment-11
USER_PASS=ENTER_YOUR_DATABASE_PASSWORD_HERE
SECRET_KEY=ENTER_YOUR_SECRET_KEY_HERE
```

---

## 📦 Run Locally

1. Make sure **MongoDB is running locally** or use **MongoDB Atlas**.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the backend server:
   ```sh
   node index.js
   ```
4. The API should be running on `http://localhost:5000`.

---

## 🗄️ Database Configuration (MongoDB)

1. **Connect MongoDB in your project** using Mongoose or native driver:

   ```js
   const { MongoClient } = require("mongodb");
   require("dotenv").config();

   const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.mongodb.net/?retryWrites=true&w=majority`;

   async function connectDB() {
     const client = new MongoClient(uri);
     try {
       await client.connect();
       console.log("Database connected successfully");
     } catch (error) {
       console.error("Database connection failed:", error);
     }
   }

   module.exports = connectDB;
   ```

2. **Make sure your `.env` file is properly configured.**

---

## 🔐 JWT Authentication

### 🔑 Generating a JWT Token

When a user logs in, the server generates a **JWT token**:

```js
const jwt = require("jsonwebtoken");

const user = { id: "user123", email: "user@example.com" };
const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });

console.log("Generated JWT:", token);
```

### 🔒 Protecting Routes with JWT

Use middleware to protect API routes:

```js
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
}

app.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "You have access!", user: req.user });
});
```

---

## 🚀 Deploy on Vercel

1. **Install Vercel CLI:**
   ```sh
   npm install -g vercel
   ```
2. **Login to Vercel:**
   ```sh
   vercel login
   ```
3. **Deploy the backend:**
   ```sh
   vercel
   ```
4. **Set environment variables on Vercel:**
   ```sh
   vercel env add USER_DB assignment-11
   vercel env add USER_PASS ENTER_YOUR_DATABASE_PASSWORD_HERE
   vercel env add SECRET_KEY ENTER_YOUR_SECRET_KEY_HERE
   ```
5. **Get the deployed API URL** and update your frontend `.env.local` file:
   ```sh
   VITE_BACKEND_URL=https://your-backend.vercel.app
   ```
6. **Rebuild and redeploy the frontend.**

---

## 📦 Dependencies

- **Express.js** - Web framework for Node.js
- **MongoDB** - Database
- **JWT (jsonwebtoken)** - User authentication
- **CORS** - Enable cross-origin requests
- **Dotenv** - Environment variable management
- **Cookie-parser** - Parse cookies

To install all dependencies:

```sh
npm install
```

---

## 📜 License

This project is **open-source** and available under the **MIT License**.

---

🚀 **Happy Coding!** 🚀

```

### ✅ What's Included?
- **Step-by-step backend setup**
- **JWT authentication guide**
- **MongoDB connection setup**
- **Vercel deployment instructions**
- **Neatly structured README**

Let me know if you need **any modifications!** 🚀😊
```
