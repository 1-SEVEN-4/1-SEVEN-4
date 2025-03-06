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

////////////유택//////////////




async function likeCountup(req, res, next) {
  next();
}
app.use('/group/:name/:likeCount', likeCountup);

app.patch('/group/:name/:likeCount', async (req, res) => {
  const { name } = req.params;
  const group = await prisma.group.findUnique({
    where: { name },
    select: { id: true },
  });
  const updatelikecount = await prisma.group.update({
    where: { name },
    data: { likeCount: { increment: 1 } },
  });
  res.send(updatelikecount);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
