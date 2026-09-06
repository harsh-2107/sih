import { z } from 'zod';
import * as authService from '../services/auth.service.js';
import { hashSessionToken } from '../utils/session.js';
import { env } from '../config/env.js';

const authSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const getCookieOptions = (expiresAt) => {
  return {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    domain: env.cookieDomain,
    expires: expiresAt,
  };
};

export const register = async (req, res, next) => {
  try {
    const validatedData = authSchema.parse(req.body);
    const user = await authService.registerUser(validatedData.email, validatedData.password);
    
    res.status(201).json({
      status: 'success',
      data: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'error', message: 'Validation error', errors: error.errors });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = authSchema.parse(req.body);
    
    // Always regenerate a session on login (handled within loginUser)
    const { user, sessionToken, expiresAt } = await authService.loginUser(validatedData.email, validatedData.password);
    
    res.cookie('sessionId', sessionToken, getCookieOptions(expiresAt));

    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        email: user.email,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'error', message: 'Validation error', errors: error.errors });
    }
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.sessionId;
    
    if (sessionToken) {
      const tokenHash = hashSessionToken(sessionToken);
      await authService.logoutUser(tokenHash);
    }

    res.clearCookie('sessionId', getCookieOptions(new Date(0)));
    
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.user is populated by the authenticate middleware
    res.status(200).json({
      status: 'success',
      data: {
        id: req.user.id,
        email: req.user.email,
      }
    });
  } catch (error) {
    next(error);
  }
};
