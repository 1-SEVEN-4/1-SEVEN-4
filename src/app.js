import express from 'express';
import cors from 'cors';

import { PORT } from './config/index.js';
import groupRoute from './routes/groupRoute.js';
import recordRoute from './routes/recordRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/groups', groupRoute);
app.use('/groups', recordRoute);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));
