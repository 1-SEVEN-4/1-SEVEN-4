import express from 'express';
import cors from 'cors';
import { PORT } from './config/index.js';
import groupRoute from './routes/groupRouter.js';
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from './controllers/ErrorController.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/groups', groupRoute);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
