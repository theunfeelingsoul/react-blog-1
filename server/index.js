const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');

// Init Express
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Init Database
const db = new Database('./blog.db');

// Create table if not exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT DEFAULT (datetime('now', 'localtime')),
    image TEXT,
    category TEXT
  )
`
).run();

// Routes
// 1. Get all posts
app.get('/posts', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
  res.json(posts);
});

// 2. Get single post
app.get('/posts/:id', (req, res) => {
  const post = db
    .prepare('SELECT * FROM posts WHERE id = ?')
    .get(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// 3. Create a new post
app.post('/posts', (req, res) => {
  const { title, content, image, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const stmt = db.prepare(
    'INSERT INTO posts (title, content, image, category) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(title, content, image, category);

  res.status(201).json({ id: result.lastInsertRowid, title, content });
});

// 4. Delete a post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
  const result = stmt.run(req.params.id);

  // if (result.changes > 0) {
  //   //res.json({ success: true });
  //   res.json({ changes: info.changes, message: 'Post deleted!' });
  // } else {
  //   res.status(404).json({ error: 'Post not found' });
  // }

  try {
    stmt.run(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- UPDATE (ignore date) ---
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, image, category } = req.body; // 👈 no date here

  const stmt = db.prepare(`
    UPDATE posts 
    SET title = ?, content = ?, image = ?, category = ?
    WHERE id = ?
  `);

  try {
    const result = stmt.run(title, content, image, category, id);

    if (result.changes > 0) {
      res.json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RESET + SEED (one call) ---
app.post('/reset-seed', (req, res) => {
  try {
    // Step 1: Delete all posts
    db.prepare('DELETE FROM posts').run();

    // Step 2: Reset autoincrement counter
    db.prepare('DELETE FROM sqlite_sequence WHERE name = "posts"').run();

    // Step 3: Insert fresh sample posts
    const stmt = db.prepare(
      'INSERT INTO posts (title, content, image, category) VALUES (?, ?, ?, ?)'
    );

    const samplePosts = [
      {
        title: 'Fresh Start 🌱',
        content: 'All old posts cleared. This is a new beginning!',
        date: '2024-01-01',
        image: 'fresh.png',
        category: 'general',
      },
      {
        title: 'Tech Reset',
        content: 'Exploring what’s next in technology after a clean slate.',
        date: '2024-01-01',
        image: 'tech.png',
        category: 'technology',
      },
      {
        title: 'Business Reset',
        content: 'A new cycle, a new market outlook.',
        date: '2024-01-01',
        image: 'business.png',
        category: 'business',
      },
    ];

    for (const post of samplePosts) {
      stmt.run(post.title, post.content, post.image, post.category);
    }

    res.json({
      message: 'Database reset and seeded successfully',
      count: samplePosts.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
