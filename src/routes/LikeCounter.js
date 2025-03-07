import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const LikeCounter = express.Router();

// eslint-disable-next-line consistent-return
LikeCounter.route('/:name/:likecounter').patch(async (req, res) => {
  const { name } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { name },
      select: { id: true, likeCount: true },
    });

    if (!group) {
      return res.status(404).send({ error: '그룹을 찾을 수 없습니다.' });
    }

    const updatedGroup = await prisma.group.update({
      where: { name },
      data: { likeCount: { increment: 1 } },
    });

    // eslint-disable-next-line no-use-before-define
    await checkAndAssignBadge(group.id);

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류 발생' });
  }
});

async function checkAndAssignBadge(groupId) {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { GroupBadge: true },
  });

  if (!group) {
    console.log('그룹을 찾을 수 없습니다.');
    return;
  }

  const hasGoldBadge = group.GroupBadge.some(
    badge => badge.groupBadgeName === 'likeCountbadge',
  );

  const memberCount = await prisma.members.count({
    where: { groupId },
  });

  const hasMemberBadge = group.GroupBadge.some(
    badge => badge.groupBadgeName === 'memberBadges',
  );

  if (group.likeCount >= 100 && !hasGoldBadge) {
    await prisma.groupBadge.create({
      data: {
        groupBadgeName: 'likeCountbadge',
        group: { connect: { id: groupId } },
      },
    });
    console.log(` ${group.name} 그룹에 likeCountbadge 뱃지가 추가되었습니다!`);
  }
  if (memberCount >= 10 && !hasMemberBadge) {
    await prisma.groupBadge.create({
      data: {
        groupBadgeName: 'memberBadges',
        group: { connect: { id: groupId } },
      },
    });
    console.log(`${group.name} 그룹에 memberBadges 뱃지가 추가되었습니다!`);
  }
}

export default LikeCounter;
