import express from 'express';
import cors from 'cors';
import path from 'path';
import groupRoute from './routes/groupRoutes.js';
import recordRoute from './routes/recordRoutes.js';
import imageRoute from './routes/imageRoutes.js';
import { PORT } from './config/index.js';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/ErrorController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/groups', groupRoute, recordRoute, imageRoute);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
