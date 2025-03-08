import express from 'express';
import cors from 'cors';
import path from 'path';

import { PORT } from './config/index.js';
import groupRoute from './routes/groupRoute.js';
import recordRoute from './routes/recordRoute.js';
import imageRoute from './routes/imageRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/groups', groupRoute);
app.use('/groups', recordRoute);
app.use('/groups', imageRoute);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
