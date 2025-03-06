import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const groupRoute = express.Router();

groupRoute.route('/:id/likes').post(async (req, res) => {
  const { id } = req.params;
  const group = await prisma.group.findUnique({
    where: { id },
  });

  const updategroup = await prisma.group.update({
    where: { id },
    data: { likeCount: (group.likeCount += 1) },
  });

  res.status(201).send(updategroup);
});

export default groupRoute;
