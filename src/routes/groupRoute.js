import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import { BadLikeCount, goodLikeCount } from '../controllers/groupController.js';

const prisma = new PrismaClient();
const groupRoute = express.Router();

groupRoute.post('/:id/likes', goodLikeCount);
groupRoute.delete('/:id/likes', BadLikeCount);

export default groupRoute;
