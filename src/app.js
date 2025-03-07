import express from 'express';
import cors from 'cors';

import { PORT } from './config/index.js';
import recordRouter from './routes/record.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/records', recordRouter);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
