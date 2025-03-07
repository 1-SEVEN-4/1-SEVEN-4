import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

// eslint-disable-next-line consistent-return
export const updateLikeCount = async (req, res) => {
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

    await checkAndAssignBadge(group.id);

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류 발생' });
  }
};

// eslint-disable-next-line consistent-return
export const getGroupBadges = async (req, res) => {
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
};
