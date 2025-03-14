import prisma from '../config/prisma.js';

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

const getWeeklyRanking = async (req, res) => {
  try {
    const { groupId } = req.params;
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

    const group = await prisma.group.findUnique({
      where : { id : groupId }  
    });

    const rankings = await prisma.record.groupBy({
      by: ['memberId'],
      _sum: { time: true },
      _count: { id: true },
      where: {groupId : groupId , createdAt: { gte: startOfWeek, lte: endOfWeek } },
      orderBy: { _sum: { time: 'desc' } },
    });

    const result = await Promise.all(
      rankings.map(async record => {
        const member = await prisma.members.findUnique({
          where: { id: record.memberId },
        });

        return {
          nickname: member ? member.nickName : '알 수 없음',
          // eslint-disable-next-line no-underscore-dangle
          recordCount: record._count.id,
          // eslint-disable-next-line no-underscore-dangle
          recordTime: formatTime(record._sum.time),
        };
      }),
    );

    res.json({ rankings: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버 오류 발생' });
  }
};

const getMonthlyRanking = async (req, res) => {
  try {
    const { groupId } = req.params;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const group = await prisma.group.findUnique({
      where : { id : groupId }  
    });

    const rankings = await prisma.record.groupBy({
      by: ['memberId'],
      _sum: { time: true },
      _count: { id: true },
      where: {groupId : groupId , createdAt: { gte: startOfMonth, lte: endOfMonth } },
      orderBy: { _sum: { time: 'desc' } },
    });

    const result = await Promise.all(
      rankings.map(async record => {
        const member = await prisma.members.findUnique({
          where: { id: record.memberId },
        });

        return {
          nickname: member ? member.nickName : '알 수 없음',
          // eslint-disable-next-line no-underscore-dangle
          recordCount: record._count.id,
          // eslint-disable-next-line no-underscore-dangle
          recordTime: formatTime(record._sum.time),
        };
      }),
    );

    res.json({ rankings: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버 오류 발생' });
  }
};

export default { getWeeklyRanking, getMonthlyRanking };
