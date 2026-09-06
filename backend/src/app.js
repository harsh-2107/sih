import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { globalRateLimiter } from './middleware/rate-limit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import routes from './routes/index.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(globalRateLimiter);

app.use('/api', routes);

app.use(errorHandler);

export default app;
