import { pool } from '../db/pool.js';

export async function createUser(email, passwordHash) {
  const query = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at, updated_at
  `;
  const result = await pool.query(query, [email.toLowerCase(), passwordHash]);
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const query = `
    SELECT id, email, password_hash, created_at, updated_at
    FROM users
    WHERE email = $1
  `;
  const result = await pool.query(query, [email.toLowerCase()]);
  return result.rows[0] || null;
}

export async function getUserById(id) {
  const query = `
    SELECT id, email, created_at, updated_at
    FROM users
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}
