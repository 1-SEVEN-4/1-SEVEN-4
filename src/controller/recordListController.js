import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getRecordList(req, res) {
  try {
    const { offset = 0, limit = 10, order = 'newest', nickName } = req.query;
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
          nickName: { contains: nickName, mode: 'insensitive' },
        },
      },
      orderBy,
      skip: parseInt(offset, 10),
      take: parseInt(limit, 10),
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
    res.status(200).send(records);
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
