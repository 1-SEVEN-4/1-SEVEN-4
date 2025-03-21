import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

const getWeeklyRanking = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  const rankings = await prisma.record.groupBy({
    by: ['memberId'],
    _sum: { time: true },
    _count: { id: true },
    where: { groupId: groupId, createdAt: { gte: startOfWeek, lte: endOfWeek } },
    orderBy: { _sum: { time: 'desc' } },
    skip: (page - 1) * limit,
    take: parseInt(limit),
  });

  const result = await Promise.all(
    rankings.map(async record => {
      const member = await prisma.members.findUnique({
        where: { id: record.memberId },
      });

      return {
        nickname: member ? member.nickName : '알 수 없음',
        recordCount: record._count.id,
        recordTime: formatTime(record._sum.time),
      };
    }),
  );

  return res.json({ rankings: result });
});

const getMonthlyRanking = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  const rankings = await prisma.record.groupBy({
    by: ['memberId'],
    _sum: { time: true },
    _count: { id: true },
    where: { groupId: groupId, createdAt: { gte: startOfMonth, lte: endOfMonth } },
    orderBy: { _sum: { time: 'desc' } },
    skip: (page - 1) * limit,
    take: parseInt(limit),
  });

  const result = await Promise.all(
    rankings.map(async record => {
      const member = await prisma.members.findUnique({
        where: { id: record.memberId },
      });

      return {
        nickname: member ? member.nickName : '알 수 없음',
        recordCount: record._count.id,
        recordTime: formatTime(record._sum.time),
      };
    }),
  );

  return res.json({ rankings: result });
});

export default { getWeeklyRanking, getMonthlyRanking };
