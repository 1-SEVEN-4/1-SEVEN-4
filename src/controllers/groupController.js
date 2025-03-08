import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGroup(req, res) {
  try {
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
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2023'
    ) {
      res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
    } else {
      res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
    }
  }
}

export async function createGroup(req, res) {
  try {
    const group = await prisma.group.create({
      data: req.body,
    });
    res.status(201).send(group);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2023'
    ) {
      res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
    } else {
      res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
    }
  }
}
