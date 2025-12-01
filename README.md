ACCESSFORGE-API
<br/>
│
<br/>
├─ backend
<br/>
│   ├─ config
<br/>
│   │   └─ database.js
<br/>
│   ├─ Controller
<br/>
│   │   └─ Auth.js
<br/>
│   ├─ middleware
<br/>
│   │   └─ auth.js
<br/>
│   ├─ Models
<br/>
│   │   └─ User.js
<br/>
│   ├─ routes
<br/>
│   │   └─ user.js
<br/>
│   ├─ .env
<br/>
│   └─ index.js
<br/>
│
<br/>
└─ frontend
<br/>
    ├─ src
    <br/>
    │   ├─ Components
    <br/>
    │   │   ├─ AdminDashboard.jsx
    <br/>
    │   │   ├─ Dashboard.jsx
    <br/>
    │   │   ├─ Login.jsx
    <br/>
    │   │   ├─ Register.jsx
    <br/>
    │   │   └─ StudentDashboard.jsx
    <br/>
    │   ├─ App.css
    <br/>
    │   ├─ App.js
    <br/>
    │   ├─ index.css
    │   └─ index.js


<br/>
   # How to Run Backend
   <br/>
cd backend
<br/>
npm install
<br/>
npm start
<br/>


<br/>
   # How to Run Frontend
   <br/>
cd frontnd
<br/>
npm install
<br/>
npm start
<br/>

# API Endpoints

| Method | Route             | Description                               | Auth |
| ------ | ----------------- | ----------------------------------------- | ---- |
| POST   | `/api/v1/signup`  | Register new user                         | ❌    |
| POST   | `/api/v1/login`   | Login & get JWT token                     | ❌    |
| GET    | `/api/v1/admin`   | Verify admin role & access (role-based)   | 🔐   |
| GET    | `/api/v1/student` | Verify student role & access (role-based) | 🔐   |

<br/>


# Environment Variables (Backend)
<br/>
Create .env inside /backend/
<br/>
PORT=4000
<br/>
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/
<br/>
JWT_SECRET=your_secret_key

