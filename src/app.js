import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'

const app = express()
    .use(morgan('dev'))
    .use(express.json())
    .use(authRoutes)
    .use(cookieParser());

export default app;