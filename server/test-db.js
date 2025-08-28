import 'dotenv/config'; // <-- this loads .env
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL!');
    const res = await client.query('SELECT NOW()');
    console.log('Server time:', res.rows[0]);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await client.end();
  }
}

test();
