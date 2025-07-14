# 🏆 Leaderboard System

A full-stack, real-time leaderboard web application where users can claim random points, view their ranking, and see a history of all point claims. Built with **React (Vite, shadcn/ui, Tailwind CSS)** on the frontend and **Node.js, Express, MongoDB (Mongoose)** on the backend.

---

## Features

- **User Management:** Add new users to the leaderboard.
- **Claim Points:** Select a user and claim random points with a single click.
- **Real-Time Leaderboard:** Instantly see updated rankings and points.
- **Point History:** Every point claim is recorded with user, points, and timestamp.
- **Modern UI:** Professional, responsive design using shadcn/ui and Tailwind CSS.
- **Toast Notifications:** Instant feedback for actions (success/error).
- **Persistent Storage:** All data stored in MongoDB.

---

##  Technologies Used

### **Frontend**
- [React] (with Vite)
- [shadcn/ui] (Radix UI + Tailwind CSS components)
- [Tailwind CSS]
- [Axios] (for API requests)
- [sonner] (for toast notifications)

### **Backend**
- [Node.js]
- [Express]
- [MongoDB] (with [Mongoose])
- [dotenv](for environment variables)
- [CORS]

---

## 📦 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/mudit203/Leaderboard-system.git
cd Leaderboard-system
```

### **2. Backend Setup**

```bash
npm run dev
```

- Create a `.env` file in the `Backend` directory:
  ```
  MONGO_URI=your_mongodb_connection_string
  URL=http://localhost:5173
  ```

- Start the backend server:
  ```bash
  npm run dev
  ```
  The backend will run on [http://localhost:3000](http://localhost:3000).

### **3. Frontend Setup**

```bash
cd Frontend
npm install
npm run build
```

- Start the frontend development server:
  ```bash
  npm run dev
  ```
  The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## 🌟 Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Add users using the input field.
3. Select a user from the dropdown and click **Claim Points** to award random points.


---

## 🛠️ API Endpoints

### **User Endpoints**
- `POST /user/add` — Add a new user  
  **Body:** `{ "name": "UserName" }`
- `GET /user/getall` — Get all users
- `GET /user/sorted` — Get users sorted by points (leaderboard)

### **Points Endpoints**
- `PUT /points/add/:id` — Add points to a user  
  **Body:** `{ "points": 10 }`


---

## 🗂️ Project Structure

```
Leaderboard-system/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── index.html
│
└── README.md
```

---

## 📋 Example .env for Backend

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/leaderboard?retryWrites=true&w=majority
URL=http://localhost:5173
```



---

