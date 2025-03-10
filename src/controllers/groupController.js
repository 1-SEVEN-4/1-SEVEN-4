import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export const getGroup = catchHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = 'newest' } = req.query;
  let orderBy;
  switch (order) {
    case 'oldest':
      orderBy = { createsAt: 'asc' };
      break;
    case 'newest':
    default:
      orderBy = { createdAt: 'desc' };
  }
  const groups = await prisma.group.findMany({
    orderBy,
    skip: offset,
    take: limit,
    include: {
      members: {
        select: {
          id: true,
          nickName: true,
          createdAt: true,
          updatedAt: true,
          groupId: true,
        },
      },
    },
  });
  res.status(200).send(groups);
});

export const createGroup = catchHandler(async (req, res) => {
  const group = await prisma.group.create({
    data: req.body,
  });
  res.status(201).send(group);
});
