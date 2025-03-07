import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import GroupRouters from './routes/GroupRouter.js';
import LikeCounter from './routes/LikeCounter.js';

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.use('/group', GroupRouters);
app.use('/group', LikeCounter);
// likecount가 오르면서 badge생성-유택//

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
