import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateSessionToken, hashSessionToken } from '../utils/session.js';
import * as userModel from '../models/user.model.js';
import * as sessionModel from '../models/session.model.js';

const SESSION_DURATION_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export async function registerUser(email, password) {
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    // Return a generic error or handle duplicate gracefully.
    // In many cases, it's safer to not reveal if an email is registered,
    // but for a register endpoint, a 409 Conflict is typical.
    // However, the requirements specify "Return the same generic authentication error for invalid email and invalid password" for login.
    // For registration, we'll throw a specific error to be handled by the controller.
    const error = new Error('Email already registered');
    error.status = 409;
    throw error;
  }

  const passwordHash = await hashPassword(password);
  const user = await userModel.createUser(email, passwordHash);

  return user;
}

export async function loginUser(email, password) {
  const user = await userModel.getUserByEmail(email);
  
  if (!user) {
    throw createGenericAuthError();
  }

  const isValidPassword = await verifyPassword(user.password_hash, password);
  if (!isValidPassword) {
    throw createGenericAuthError();
  }

  const sessionToken = generateSessionToken();
  const tokenHash = hashSessionToken(sessionToken);
  
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  
  await sessionModel.createSession(user.id, tokenHash, expiresAt);

  return {
    user: { id: user.id, email: user.email },
    sessionToken,
    expiresAt
  };
}

export async function logoutUser(tokenHash) {
  if (tokenHash) {
    await sessionModel.revokeSession(tokenHash);
  }
}

export async function validateSession(tokenHash) {
  const session = await sessionModel.getSessionByTokenHash(tokenHash);
  
  if (!session || session.revoked_at) {
    return null;
  }

  const now = new Date();
  if (new Date(session.expires_at) < now) {
    return null;
  }

  // Asynchronously update last used time
  sessionModel.updateSessionLastUsed(tokenHash).catch(err => {
    console.error('Failed to update session last_used_at', err);
  });

  const user = await userModel.getUserById(session.user_id);
  if (!user) {
    return null;
  }

  return user;
}

function createGenericAuthError() {
  const error = new Error('Invalid email or password');
  error.status = 401;
  return error;
}
