// ./backend/server.js
import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import starterPosts from "../src/data/posts.js"; // adjust path if needed

const app = express();
app.use(express.json());
app.use(cors());

// open db (creates db.sqlite if it doesn’t exist)
const db = new Database("db.sqlite");

// ensure posts table exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    image TEXT,
    category TEXT,
    date TEXT
  )
`
).run();

// reset route
app.post("/api/reset", (req, res) => {
  try {
    // Clear table
    db.prepare("DELETE FROM posts").run();

    // Insert starter posts
    const insertStmt = db.prepare(
      "INSERT INTO posts (title, content, image, category, date) VALUES (?, ?, ?, ?, ?)"
    );

    const insertMany = db.transaction((posts) => {
      for (const post of posts) {
        insertStmt.run(
          post.title,
          post.content,
          post.image,
          post.cat, // careful: frontend uses `cat`, db column is `category`
          post.date
        );
      }
    });

    insertMany(starterPosts);

    // Return new posts
    const allPosts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
    res.json(allPosts);
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ error: "Failed to reset database" });
  }
});

// simple test route
app.get("/api/posts", (req, res) => {
  try {
    const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
    res.json(posts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// get single post
app.get("/api/posts/:id", (req, res) => {
  try {
    const post = db
      .prepare("SELECT * FROM posts WHERE id = ?")
      .get(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error("Fetch single error:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// add new post
app.post("/api/posts", (req, res) => {
  try {
    const { title, content, image, category, date } = req.body;
    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ error: "Title, content, and category are required" });
    }

    const stmt = db.prepare(
      "INSERT INTO posts (title, content, image, category, date) VALUES (?, ?, ?, ?, ?)"
    );
    const info = stmt.run(title, content, image || "", category, date);

    const newPost = db
      .prepare("SELECT * FROM posts WHERE id = ?")
      .get(info.lastInsertRowid);
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Add post error:", err);
    res.status(500).json({ error: "Failed to add post" });
  }
});

// update post
app.put("/api/posts/:id", (req, res) => {
  try {
    const { title, content, image, category, date } = req.body;

    const stmt = db.prepare(
      "UPDATE posts SET title = ?, content = ?, image = ?, category = ?, date = ? WHERE id = ?"
    );
    const info = stmt.run(
      title,
      content,
      image || "",
      category,
      date,
      req.params.id
    );

    if (info.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updated = db
      .prepare("SELECT * FROM posts WHERE id = ?")
      .get(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// delete post
app.delete("/api/posts/:id", (req, res) => {
  try {
    const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
    const info = stmt.run(req.params.id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
