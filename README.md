# HR3 Managements - Request Management Platform

**HR3 Managements** is a modern web application built to streamline request handling for both users and admins.  
The platform provides secure authentication, dynamic request management, analytics, and a responsive user-friendly interface, ensuring smooth operations for organizations.

---

## Project Overview

This repository contains the complete **HR3 Managements** application.  
It allows **users** to create and manage requests, while **admins** can monitor, filter, and analyze those requests through an interactive dashboard. The project focuses on efficiency, clarity, and real-time updates for better management.

### 🔑 Admin Credentials

- **Username:** `admin@a12.com`
- **Password:** `Admin@12`

---

## ⚡ Key Features

1. **User Authentication** – Role-based secure login for users and admins.
2. **Request Management** – Create, view, and manage requests seamlessly.
3. **Admin Dashboard** – Centralized dashboard for tracking all requests.
4. **Pie Chart Analytics** – Visual insights on `returnable` vs `non-returnable` requests.
5. **Email Filtering** – Filter requests based on `requestFor` (recipient email).
6. **Dynamic Search & Filter** – Quickly find requests with ease.
7. **Real-Time Updates** – Automatic updates without refreshing the page.
8. **Responsive Design** – Fully optimized for mobile, tablet, and desktop.
9. **User-Friendly Interface** – Clean and intuitive design for all users.
10. **Secure Data Handling** – Follows best practices for data safety.

---

## 🛠️ Technologies Used

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Hosting:** Netlify (Frontend), Vercel (Backend)

---

## Dev Dependencies

```json
 "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.1.1",
    "@react-pdf/renderer": "^4.3.0",
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.1",
    "@tailwindcss/vite": "^4.1.10",
    "@tanstack/react-query": "^5.80.7",
    "@tanstack/react-table": "^8.21.3",
    "@xyflow/react": "^12.7.0",
    "aos": "^3.0.0-beta.6",
    "axios": "^1.10.0",
    "dotenv": "^16.5.0",
    "firebase": "^11.9.1",
    "prop-types": "^15.8.1",
    "react": "^19.1.0",
    "react-calendar": "^6.0.0",
    "react-dom": "^19.1.0",
    "react-helmet-async": "^2.0.5",
    "react-icons": "^5.5.0",
    "react-loader-spinner": "^6.1.6",
    "react-responsive-carousel": "^3.2.23",
    "react-router": "^7.6.2",
    "react-toastify": "^11.0.5",
    "react-tooltip": "^5.29.1",
    "recharts": "^3.0.0",
    "sweetalert2": "^11.6.13",
    "tailwindcss": "^4.1.10"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "vite": "^6.3.5"
  }
```

---

# **Installation Process**

Follow the steps below to run **HR3 Managements** on your local machine.

---

## **1️⃣ Clone the Repository**

```bash
git clone https://github.com/mrirakib04/web-practice-9
cd web-practice-9
```

---

## **2️⃣ Install Dependencies**

```bash
npm install
```

---

## **3️⃣ Configure Environment Variables**

Create a `.env` file in the project root:

```
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_STORAGE_BUCKET
VITE_messagingSenderId=XXXX
VITE_appId=XXXX
VITE_serverURL=https://your-backend-url.vercel.app
```

> ⚠️ **Note:** Make sure Firebase Auth is correctly set up for email/password login.

---

## **4️⃣ Start the Development Server**

```bash
npm run dev
```

---

## **5️⃣ Open in Browser**

Visit:

```
http://localhost:5173
```

Admin users can log in using the provided credentials.

---

## 🌐 Links

- **Live Site:** [https://mrirakib-web-practice-9.netlify.app/](https://mrirakib-web-practice-9.netlify.app/)
- **Repository:** [https://github.com/mrirakib04/web-practice-9](https://github.com/mrirakib04/web-practice-9)

---

## 📌 Conclusion

Thank you for exploring **HR3 Managements**!  
Your feedback and suggestions are always welcome.

---

Developed by **Md Rakibul Islam Rakib**  
✨ Design: **Own Idea**
