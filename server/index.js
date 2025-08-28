import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js'; // 👈 use our db.js

//dotenv.config(); // load .env first
// Always load from the /server folder
dotenv.config({ path: './server/.env' });

// Init Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Create table if not exists (run once on startup) ---
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date TIMESTAMP DEFAULT NOW(),
        image TEXT,
        category TEXT
      )
    `);
    console.log('✅ Table ready');
  } catch (err) {
    console.error('❌ Error creating table:', err);
  }
})();

// Test DB connection
pool
  .connect()
  .then((client) => {
    console.log('✅ Connected to PostgreSQL!');
    client.release();
  })
  .catch((err) => console.error('❌ Database connection failed:', err.stack));

// --- ROUTES ---
// 1. Get all posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get single post
app.get('/posts/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Create a new post
app.post('/posts', async (req, res) => {
  const { title, content, image, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, image, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, image, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete a post
app.delete('/posts/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rowCount > 0) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Update a post
app.put('/posts/:id', async (req, res) => {
  const { title, content, image, category } = req.body;
  try {
    const result = await pool.query(
      `UPDATE posts 
       SET title = $1, content = $2, image = $3, category = $4 
       WHERE id = $5 RETURNING *`,
      [title, content, image, category, req.params.id]
    );
    if (result.rowCount > 0) {
      res.json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Reset + seed
app.post('/reset-seed', async (req, res) => {
  try {
    await pool.query('TRUNCATE posts RESTART IDENTITY');
    const samplePosts = [
      [
        'Fresh Start 🌱',
        'All old posts cleared. This is a new beginning!',
        'fresh.png',
        'general',
      ],
      [
        'Tech Reset',
        'Exploring what’s next in technology after a clean slate.',
        'tech.png',
        'technology',
      ],
      [
        'Business Reset',
        'A new cycle, a new market outlook.',
        'business.png',
        'business',
      ],
    ];
    for (const post of samplePosts) {
      await pool.query(
        'INSERT INTO posts (title, content, image, category) VALUES ($1, $2, $3, $4)',
        post
      );
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
