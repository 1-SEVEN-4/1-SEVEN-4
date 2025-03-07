import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMember(req, res) {
  try {
    const { groupId } = req.params;
    const { nickName, password } = req.body;

    const newMember = await prisma.members.create({
      data: {
        nickName,
        password,
        groupId,
      },
    });

    res.status(201).send(newMember);
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

export async function getMember(req, res) {
  try {
    const { groupId } = req.params;

    const members = await prisma.members.findMany({
      where: {
        groupId,
      },
    });

    res.status(200).send(members);
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

export async function deleteMember(req, res) {
  try {
    const { groupId } = req.params;
    const { nickName } = req.body;

    const member = await prisma.members.findUnique({
      where: { groupId, nickName },
    });

    await prisma.members.delete({
      where: { id: member.id },
    });

    res.status(204).send();
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
