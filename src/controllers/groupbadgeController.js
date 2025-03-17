import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export async function checkAndAssignBadge(groupId) {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { groupBadge: true },
  });

  if (!group) {
    console.log('그룹을 찾을 수 없습니다.');
    return;
  }

  const hasGoldBadge = group.groupBadge.some(badge => badge.groupBadgeName === 'likeCountBadge');

  const memberCount = await prisma.members.count({
    where: { groupId },
  });

  const recordCount = await prisma.record.count({
    where: { groupId },
  });

  const hasMemberBadge = group.groupBadge.some(badge => badge.groupBadgeName === 'memberBadges');
  const hasrecordBadge = group.groupBadge.some(badge => badge.groupBadgeName === 'recordBadge');

  if (group.likeCount >= 100 && !hasGoldBadge) {
    await prisma.groupBadge.create({
      data: {
        groupBadgeName: 'likeCountBadge',
        group: { connect: { id: groupId } },
      },
    });
    console.log(` ${group.name} 그룹에 likeCountBadge가 추가되었습니다!`);
  }

  if (memberCount >= 10 && !hasMemberBadge) {
    await prisma.groupBadge.create({
      data: {
        groupBadgeName: 'memberBadges',
        group: { connect: { id: groupId } },
      },
    });
    console.log(`${group.name} 그룹에 memberBadges가 추가되었습니다!`);
  }
  if (recordCount >= 100 && !hasrecordBadge) {
    await prisma.groupBadge.create({
      data: {
        groupBadgeName: 'recordBadge',
        group: { connect: { id: groupId } },
      },
    });
    console.log(`${group.name} 그룹에 recordBadge가 추가되었습니다!`);
  }
}

export const updateLikeCount = catchHandler(async (req, res) => {
  const { name } = req.params;
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

  return res.json(updatedGroup);
});

export const getGroupBadges = catchHandler(async (req, res) => {
  const { name } = req.params;
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

  return res.status(200).json(groupBadges);
});
