# 🚗 Car Rent Platform - Backend

This is the **backend API** for the Car Rent Platform, built using **Node.js, Express.js, MongoDB, and JWT authentication**.

🚀 **Live API URL:** [Backend Deployed on Vercel](https://assignment-11-sable.vercel.app)

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
   git clone https://github.com/ashraful2871/Car-Rental-Server.git
   cd car-rental-backend

   ```

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
USER_DB=ENTER_YOUR_DATABASE_USER_HERE
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

1. **Connect MongoDB in your project** change your MongoDB uri:
   The backend connects to MongoDB Atlas using credentials from the .env file.
   Make sure your MongoDB Atlas database is set up and the credentials are correct.

   ```js
   const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.mongodb.net/?retryWrites=true&w=majority`;
   ```

2. **Make sure your `.env` file is properly configured.**

---

## 🔐 Authentication

This backend uses JWT (JSON Web Token) for secure authentication.

- JWT tokens are generated upon login.
- Protected API routes require a valid JWT token for access.
- Tokens are stored securely and used for user verification.

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
   VITE_API_URL=HERE_IS_YOUR_BACKEND_API_URL
   ```
6. **Rebuild and redeploy the frontend.**
   Here's the **after-deployment update process** for your backend:

### 🔄 **Update Backend After Deployment on Vercel**

If you make changes to the backend **after deployment**, follow these steps:

1. **Pull the latest code or make updates locally.**
2. **Deploy the changes to Vercel:**
   ```sh
   vercel --prod
   ```
3. **If environment variables change, update them on Vercel:**
   ```sh
   vercel env add USER_DB assignment-11
   vercel env add USER_PASS NEW_DATABASE_PASSWORD
   vercel env add SECRET_KEY NEW_SECRET_KEY
   ```
4. **Restart the Vercel project (if needed):**
   ```sh
   vercel redeploy
   ```
5. **Check Vercel logs to confirm changes:**
   ```sh
   vercel logs
   ```

## Now your **backend changes are live!** 🚀 Let me know if you need further refinements. 😊

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

This project is **open-source** .

---

🚀 **Happy Coding!** 🚀
