import express from 'express';
import cors from 'cors';

import { PORT } from './config/index.js';
import recordListRoutes from './routes/recordListRoutes.js';
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from './controllers/ErrorContoller.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/records', recordListRoutes);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
