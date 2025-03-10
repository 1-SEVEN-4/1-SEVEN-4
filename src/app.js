/* eslint-disable prettier/prettier */
import express from 'express';
import cors from 'cors';
import { PORT } from './config/index.js';
import groupMemberRouters from './routes/member.js';

import groupRouters from './routes/group.js';
import recordListRoutes from './routes/recordListRoutes.js';

import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from './controllers/ErrorController.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/groups', groupMemberRouters);
app.use('/groups', groupRouters);

app.use('/groups', recordListRoutes);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
