import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/sih_db',
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  cookieSameSite: process.env.COOKIE_SAMESITE || 'Lax',
  cookieDomain: process.env.COOKIE_DOMAIN || undefined,
};
