import { PrismaClient } from '@prisma/client';

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

    return res.status(201).send(newMember);
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
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

    return res.status(200).send(members);
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
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

    return res.status(204).send();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
  }
}
