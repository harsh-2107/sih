import pkg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: env.databaseUrl,
});

export const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    return { success: true, timestamp: result.rows[0].now };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
