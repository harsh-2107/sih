import crypto from 'crypto';

/**
 * Generates a cryptographically secure random session token.
 * @returns {string} The base64url encoded session token.
 */
export function generateSessionToken() {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Creates a SHA-256 hash of a session token for safe storage.
 * @param {string} token - The raw session token.
 * @returns {string} The hex encoded hash.
 */
export function hashSessionToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
