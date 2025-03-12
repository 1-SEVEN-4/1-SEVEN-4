import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import groupRoute from './routes/groupRoute.js';
import groupbadge from './routes/groupbadge.js';
import rankingRoute from './routes/rankingRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.use('/group', groupRoute);
app.use('/group', groupbadge);
app.use('/ranking', rankingRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
