import express from 'express';
import cors from 'cors';
import path from 'path';
import badgeRouter from './routes/groupBadgeRoutes.js';
import rankingRoute from './routes/rankingRoute.js';
import groupRoute from './routes/groupRoutes.js';
import recordRoute from './routes/recordRoutes.js';
import imageRoute from './routes/imageRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import recordListRoutes from './routes/recordListRoutes.js';
import groupLikeRoute from './routes/groupLikeRoutes.js';
import { PORT } from './config/index.js';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/ErrorController.js';
import { getGroupBadges } from './controllers/groupbadgeController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/groups',rankingRoute);
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/groups', groupRoute, memberRoutes, recordRoute, recordListRoutes, imageRoute, groupLikeRoute, badgeRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
 