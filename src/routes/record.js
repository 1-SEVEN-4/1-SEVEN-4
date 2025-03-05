import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const recordRouter = express.Router();

recordRouter.route('/').get(async (req, res) => {
  const { offset = 0, limit = 10, order = 'newest', nickname } = req.query;
  let orderBy;
  switch (order) {
    case 'fastest':
      orderBy = { time: 'desc' };
      break;
    case 'slowest':
      orderBy = { time: 'asc' };
      break;
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  const records = await prisma.record.findMany({
    where: {
      members: {
        nickname: { contains: nickname, mode: 'insensitive' },
      },
    },
    orderBy,
    skip: parseInt(offset, 10),
    take: parseInt(limit, 10),
    include: {
      members: {
        select: {
          nickname: true,
        },
      },
    },
  });
  res.status(200).send(records);
});

recordRouter.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await prisma.record.delete({
    where: { id },
  });
  res.status(204).send();
});

export default recordRouter;
