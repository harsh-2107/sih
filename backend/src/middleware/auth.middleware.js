import { hashSessionToken } from '../utils/session.js';
import { validateSession } from '../services/auth.service.js';

export const authenticate = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.sessionId;
    
    if (!sessionToken) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const tokenHash = hashSessionToken(sessionToken);
    const user = await validateSession(tokenHash);

    if (!user) {
      // Clear the invalid cookie
      res.clearCookie('sessionId');
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
