import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const groupBadgeRouter = express.Router();

// eslint-disable-next-line consistent-return
groupBadgeRouter.route('/:name/:groupbadges').get(async (req, res) => {
  const { name } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { name },
      select: { id: true },
    });
    if (!group) {
      return res.status(404).json({ error: '그룹을 찾을 수 없습니다.' });
    }
    const groupBadges = await prisma.groupBadge.findMany({
      where: { groupId: group.id },
      select: {
        groupBadgeName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (groupBadges.length === 0) {
      return res.status(200).send({ message: '배지가 없습니다.' });
    }

    res.status(200).json(groupBadges);
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).send({ error: '서버 오류가 발생했습니다.' });
  }
});

export default groupBadgeRouter;
