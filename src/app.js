import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import groupbadge from './routes/groupbadgeRoute.js';
import rankingRoute from './routes/rankingRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.use('/group', groupbadge);
app.use('/ranking', rankingRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
