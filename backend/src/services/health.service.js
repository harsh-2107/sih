import { checkDatabaseConnection } from '../db/pool.js';

export const getHealthStatus = async () => {
  const dbStatus = await checkDatabaseConnection();
  return {
    status: dbStatus.success ? 'healthy' : 'unhealthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus,
  };
};
