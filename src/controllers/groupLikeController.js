import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export const likeCount = catchHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    return res.status(400).send({ message: '그룹을 찾을 수 없습니다.' });
  }

  const updateGroup = await prisma.group.update({
    where: { id: groupId },
    data: { likeCount: (group.likeCount += 1) },
  });

  res.status(200).send(updateGroup);
});

export const unLikeCount = catchHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });
  if (!group) {
    return res.status(400).send({ message: '그룹을 찾을 수 없습니다.' });
  }

  if (group.likeCount === 0) {
    return res.status(400).send({ message: '취소할 추천 수가 없습니다.' });
  }

  const updateGroup = await prisma.group.update({
    where: { id: groupId },
    data: { likeCount: (group.likeCount -= 1) },
  });

  res.status(200).send(updateGroup);
});
