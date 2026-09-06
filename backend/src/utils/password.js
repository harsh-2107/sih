import argon2 from 'argon2';

/**
 * Hashes a plaintext password using Argon2id.
 * @param {string} password - The plaintext password.
 * @returns {Promise<string>} The hashed password.
 */
export async function hashPassword(password) {
  return argon2.hash(password, {
    type: argon2.argon2id,
  });
}

/**
 * Verifies a plaintext password against a hash.
 * @param {string} hash - The stored Argon2id hash.
 * @param {string} password - The plaintext password to verify.
 * @returns {Promise<boolean>} True if the password matches, false otherwise.
 */
export async function verifyPassword(hash, password) {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    return false;
  }
}
