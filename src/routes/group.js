import express from 'express';
import { PrismaClient } from '@prisma/client';

const groupRouter = express.Router();
const prisma = new PrismaClient();

groupRouter
  .route('/')
  .get(async (req, res) => {
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
            nickname: true,
          },
        },
      },
    });
    res.status(200).send(groups);
  })
  .post(async (req, res) => {
    const group = await prisma.group.create({
      data: req.body,
    });
    res.status(201).send(group);
  });

export default groupRouter;
