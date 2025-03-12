import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import path from 'path';
import groupbadge from './routes/groupbadgeRoute.js';
import rankingRoute from './routes/rankingRoute.js';
import groupRoute from './routes/groupRoutes.js';
import recordRoute from './routes/recordRoutes.js';
import imageRoute from './routes/imageRoutes.js';
import { PORT } from './config/index.js';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/ErrorController.js';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/group', groupbadge);
app.use('/ranking', rankingRoute);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/groups', groupRoute, recordRoute, imageRoute);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
