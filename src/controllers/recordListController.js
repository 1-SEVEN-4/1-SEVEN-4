import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';
import { timeToString, formatTime } from '../util/timeUtil.js';

const getRecordList = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const {
    offset = 0,
    limit = 10,
    order = 'newest',
    searchnickname,
  } = req.query;

  let orderBy;
  switch (order) {
    case 'longtime':
      orderBy = { time: 'desc' };
      break;
    case 'shorttime':
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
        nickName: { contains: searchnickname, mode: 'insensitive' },
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

  const responseRecords = records.map(record => ({
    id: record.id,
    sports: record.sports,
    description: record.description,
    time: formatTime(record.time),
    distance: record.distance,
    photo: record.photo,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    members: record.members,
  }));

  res.status(200).send(responseRecords);
});

export default getRecordList;
