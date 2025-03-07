import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.post('/group', async (req, res) => {
  const {
    name,
    ownerNickName,
    description,
    ownerPassword,
    photo,
    tag,
    goalRep,
    discordURL,
    invitationURL,
  } = req.body;
  const newdata = await prisma.group.create({
    data: {
      name,
      ownerNickName,
      description,
      ownerPassword,
      photo,
      tag,
      goalRep,
      discordURL,
      invitationURL,
    },
  });
  res.status(201).send(newdata);
});

async function passwordCheck(groupId, Password) {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: { ownerPassword: true },
  });
  if (!group) {
    throw new Error('그룹을 찾을 수 없습니다.');
  }
  const storedPassword = group.ownerPassword;
  console.log('Received Password:', Password);
  console.log('Stored Password:', storedPassword);
  if (Password !== storedPassword) {
    throw new Error('일치하지 않소소');
  }
}

app.patch('/group/:id', async (req, res) => {
  const { id } = req.params;
  const { ownerPassword, goalRep, discordURL, invitationURL } = req.body;

  await passwordCheck(id, ownerPassword);
  const passwordpatch = await prisma.group.update({
    where: { id },
    data: {
      goalRep,
      discordURL,
      invitationURL,
    },
  });
  res.status(200).send(passwordpatch);
});

app.delete('/group/:id', async (req, res) => {
  const { id } = req.params;
  const { ownerPassword } = req.body;
  await passwordCheck(id, ownerPassword);
  const group = await prisma.group.delete({
    where: { id },
  });
  res.json({ message: '그룹이 삭제되었습니다.', deletedGroup: group });
});

app.get('/group', async (req, res) => {
  const { search } = req.query;
  const whereCondition = search
    ? {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }
    : {};

  const group = await prisma.group.findMany({
    where: whereCondition,
    select: {
      id: true,
      name: true,
      ownerNickName: true,
      description: true,
      ownerPassword: true,
      photo: true,
      tags: true,
      goalRep: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.send(group);
});

app.get('/group/:id', async (req, res) => {
  const { id } = req.params;
  const group = await prisma.group.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      ownerNickName: true,
      description: true,
      ownerPassword: true,
      photo: true,
      tags: true,
      goalRep: true,
      discordURL: true,
      invitationURL: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.send(group);
});

// likecount가 오르면서 badge생성-유택//
// eslint-disable-next-line consistent-return
app.patch('/group/:name/likecount', async (req, res) => {
  const { name } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { name },
      select: { id: true, likeCount: true },
    });

    if (!group) {
      return res.status(404).json({ error: '그룹을 찾을 수 없습니다.' });
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
  } else if (group.likeCount < 100 && hasGoldBadge) {
    await prisma.groupBadge.deleteMany({
      where: { groupId, groupBadgeName: 'likeCountbadge' },
    });
    console.log(
      ` ${group.name} 그룹에서 likeCountbadge 뱃지가 제거되었습니다.`,
    );
  } else {
    console.log('변경 사항이 없습니다.');
  }
  if (memberCount >= 10 && !hasMemberBadge) {
    await prisma.groupBadge.create({
      data: {
        groupBadgeName: 'memberBadges',
        group: { connect: { id: groupId } },
      },
    });
    console.log(`${group.name} 그룹에 memberBadges 뱃지가 추가되었습니다!`);
  } else if (memberCount < 10 && hasMemberBadge) {
    await prisma.groupBadge.deleteMany({
      where: { groupId, groupBadgeName: 'memberBadges' },
    });
    console.log(`${group.name} 그룹에서 memberBadges 뱃지가 제거되었습니다.`);
  } else {
    console.log('변경 사항이 없습니다.');
  }
}

// eslint-disable-next-line consistent-return
app.get('/group/:name/groupbadges', async (req, res) => {
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
      return res.status(200).json({ message: '배지가 없습니다.' });
    }

    res.status(200).json(groupBadges);
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
