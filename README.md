# React Blog (Database Integrated Version)

This branch (`feature/database-integration`) is an upgraded version of the **React Blog** project.  
Unlike the static version on `main`/`master`, this version uses an **Express backend** with a **SQLite database** for storing and fetching blog posts.

---

## 🚀 Tech Stack

- **Frontend:** React (CRA)
- **Backend:** Express.js
- **Database:** better-sqlite3
- **API Testing:** cURL / fetch

---

## 📂 Project Structure

```
react-blog-1/
│
├── client/ # React frontend
├── server/ # Express backend
│ ├── db/ # SQLite database + queries
│ └── routes/ # API routes
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo and checkout this branch

```bash
git clone https://github.com/theunfeelingsoul/react-blog-1.git
cd react-blog-1
git checkout feature/database-integration

```

### 2. Install dependencies

Install both frontend and backend packages:

From project root

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Start the servers

In one terminal (backend):

```bash
cd server
npm start
```

In another terminal (frontend):

```bash
cd client
npm start
```

- Backend runs at: http://localhost:5000
- Frontend runs at: http://localhost:3000

---

## 🗄️ Database

- Uses better-sqlite3 ( embedded database, no extra setup required ).
- Database file: server/blog.db.
- Initial schema includes a posts table with fields:
  - id
  - title
  - content
  - created_at

---

## 📡 API Endpoints

Get all posts

```bash
GET /api/posts
```

Get post by ID

```bash
GET /api/posts/:id
```

Create a new post
POST /api/posts

```bash
# JSON body:
{
  "title": "My first post",
  "content": "Hello from SQLite!"
}
```

Delete a post

```bash
DELETE /api/posts/:id
```

---

## 📝 Notes

This branch is for demo/testing database integration.

If you want to deploy, you’ll need to host the frontend (e.g., Vercel) and the backend (e.g., Render, Railway).

---

## 📌 Branch Info

Main/master → Static posts version.

feature/database-integration → SQLite-powered fullstack version.

---
