import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

const getRecordList = catchHandler(async (req, res) => {
  const { groupId } = req.params;
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
      groupId,
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
});

export default getRecordList;
