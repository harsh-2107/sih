import { pool } from '../db/pool.js';

export async function createSession(userId, tokenHash, expiresAt) {
  const query = `
    INSERT INTO sessions (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, expires_at, created_at, last_used_at
  `;
  const result = await pool.query(query, [userId, tokenHash, expiresAt]);
  return result.rows[0];
}

export async function getSessionByTokenHash(tokenHash) {
  const query = `
    SELECT id, user_id, token_hash, expires_at, revoked_at, created_at, last_used_at
    FROM sessions
    WHERE token_hash = $1
  `;
  const result = await pool.query(query, [tokenHash]);
  return result.rows[0] || null;
}

export async function revokeSession(tokenHash) {
  const query = `
    UPDATE sessions
    SET revoked_at = NOW()
    WHERE token_hash = $1 AND revoked_at IS NULL
    RETURNING id
  `;
  const result = await pool.query(query, [tokenHash]);
  return result.rows[0] || null;
}

export async function updateSessionLastUsed(tokenHash) {
  const query = `
    UPDATE sessions
    SET last_used_at = NOW()
    WHERE token_hash = $1
  `;
  await pool.query(query, [tokenHash]);
}
