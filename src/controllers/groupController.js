import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGroupList(req, res) {
  try {
    const { offset = 0, limit = 10, order = 'newest', search = '' } = req.query;
    let orderBy;
    switch (order) {
      case 'bestLikeCount':
        orderBy = { likeCount: 'desc' };
        break;
      case 'bestMembers':
        orderBy = { memberCount: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
    }
    const groups = await prisma.group.findMany({
      where: {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      },
      select: {
        name: true,
        ownerNickname: true,
        photo: true,
        tags: true,
        goalRep: true,
        likeCount: true,
        memberCount: true,
      },
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.status(200).send(groups);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2023'
    ) {
      res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
    } else {
      res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
    }
  }
}

export async function goodLikeCount(req, res) {
  try {
    const { id } = req.params;

    const group = await prisma.group.findUnique({
      where: { id },
    });

    const updateGroup = await prisma.group.update({
      where: { id },
      data: { likeCount: (group.likeCount += 1) },
    });

    res.status(200).send(updateGroup);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2023'
    ) {
      res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
    } else {
      res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
    }
  }
}

export async function badLikeCount(req, res) {
  try {
    const { id } = req.params;

    const group = await prisma.group.findUnique({
      where: { id },
    });

    if (group.likeCount === 0) {
      return res
        .status(400)
        .send({ message: '현재 추천이 없는 상태라서 취소할 수 없습니다.' });
    }

    const updateGroup = await prisma.group.update({
      where: { id },
      data: { likeCount: (group.likeCount -= 1) },
    });

    res.status(200).send(updateGroup);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2023'
    ) {
      res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
    } else {
      res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
    }
  }
}
