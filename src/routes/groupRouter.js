import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const groupRoute = express.Router();

groupRoute.route('/').get(async (req, res) => {
  const { offset = 0, limit = 10, order = 'newest', search = '' } = req.query;

  let orderBy;
  switch (order) {
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'recommendation':
      orderBy = { recommendation: 'desc' };
      break;
    case 'member':
      orderBy = { _count: { Member: 'desc' } };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  const groups = await prisma.group.findMany({
    where: {
      groupName: { contains: search, mode: 'insensitive' },
    },
    select: {
      id: true,
      groupName: true,
      nickName: true,
      photo: true,
      tag: true,
      goalCount: true,
      recommendation: true,
      _count: { select: { Member: true } },
    },
    orderBy,
    skip: Number(offset),
    take: Number(limit),
  });

  res.status(200).send(groups);
});

export default groupRoute;
