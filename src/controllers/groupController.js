import { prisma } from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export const goodLikeCount = catchHandler(async (req, res) => {
  const { id } = req.params;

  const group = await prisma.group.findUnique({
    where: { id },
  });

  const updateGroup = await prisma.group.update({
    where: { id },
    data: { likeCount: (group.likeCount += 1) },
  });

  res.status(200).send(updateGroup);
});

export const badLikeCount = catchHandler(async (req, res) => {
  const { id } = req.params;

  const group = await prisma.group.findUnique({
    where: { id },
  });

  if (group.likeCount === 0) {
    return res.status(400).send({ message: '취소할 추천 수가 없습니다.' });
  }

  const updateGroup = await prisma.group.update({
    where: { id },
    data: { likeCount: (group.likeCount -= 1) },
  });

  res.status(200).send(updateGroup);
});
