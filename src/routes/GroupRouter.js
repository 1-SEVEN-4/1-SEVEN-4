import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const GroupRouters = express.Router();

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

GroupRouters.route('/')
  .post(async (req, res) => {
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
  })
  .get(async (req, res) => {
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

GroupRouters.route('/:id')
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const { ownerPassword } = req.body;
    await passwordCheck(id, ownerPassword);
    const group = await prisma.group.delete({
      where: { id },
    });
    res.json({ message: '그룹이 삭제되었습니다.', deletedGroup: group });
  })
  .get(async (req, res) => {
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
export default GroupRouters;
