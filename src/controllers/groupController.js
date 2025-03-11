import { validate } from 'superstruct';
import prisma from '../config/prisma.js';
import { CreateGroupSchema, validationError } from '../util/superstruct.js';
import { catchHandler } from '../lib/catchHandler.js';

export const createGroup = catchHandler(async (req, res) => {
  const [error] = validate(req.body, CreateGroupSchema);
  if (error) {
    const message = validationError(error);
    return res.status(400).send({ message });
  }
  const { ownerNickname } = req.body;

  const existNickName = await prisma.members.findFirst({
    where: { nickName: ownerNickname },
  });

  if (existNickName) {
    return res.status(400).send({ message: '이미 존재하는 닉네임입니다.' });
  }

  const newGroup = await prisma.group.create({
    data: {
      name: req.body.name,
      ownerNickName: ownerNickname,
      ownerPassword: req.body.ownerPassword,
      description: req.body.description,
      photo: req.body.photo,
      tags: req.body.tags,
      goalRep: req.body.goalRep,
      discordURL: req.body.discordURL,
      invitationURL: req.body.invitationURL,
      likeCount: 0,
      memberCount: 1,
      Members: {
        create: {
          nickName: ownerNickname,
          password: req.body.ownerPassword,
        },
      },
    },
    include: { Members: true, badge: true },
  });

  const result = {
    id: newGroup.id,
    name: newGroup.name,
    description: newGroup.description,
    photo: newGroup.photo,
    goalRep: newGroup.goalRep,
    discordURL: newGroup.discordURL,
    invitationURL: newGroup.invitationURL,
    likeCount: newGroup.likeCount,
    tags: newGroup.tags,
    ownerNickName: newGroup.ownerNickName,
    members: newGroup.Members.map(member => ({
      id: member.id,
      nickname: member.nickName,
      createdAt: new Date(member.createdAt).getTime(),
      updatedAt: new Date(member.updatedAt).getTime(),
    })),
    createdAt: new Date(newGroup.createdAt).getTime(),
    updatedAt: new Date(newGroup.updatedAt).getTime(),
    badges: newGroup.badge ? [newGroup.badge.badgeId] : [],
  };
  return res.status(201).send(result);
});
