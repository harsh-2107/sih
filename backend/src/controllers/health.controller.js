import { getHealthStatus } from '../services/health.service.js';

export const healthCheck = async (req, res, next) => {
  try {
    const health = await getHealthStatus();
    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    next(error);
  }
};
