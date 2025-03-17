import { catchHandler } from '../lib/catchHandler.js';
import { validate } from 'superstruct';
import { CreateGroupSchema, validationError } from '../util/superstruct.js';
import prisma from '../config/prisma.js';

export const getGroup = catchHandler(async (req, res) => {
  const { page = 1, limit = 10, order = 'newest', orderBy = 'createdAt', searchgroupname = '' } = req.query;

  const validOrderBy = ['recommendation', 'participantCount', 'createdAt'];
  if (!validOrderBy.includes(orderBy)) {
    return res.status(400).send({
      message: 'orderBy parameter는 values: [‘likeCount’, ‘memberCount’, ‘createdAt’]를 포함해야합니다.',
    });
  }

  let orderByClause;
  switch (orderBy) {
    case 'recommendation':
      orderByClause = { likeCount: 'desc' };
      break;
    case 'participantCount':
      orderByClause = { memberCount: 'desc' };
      break;
    case 'createdAt':
      orderByClause = { createdAt: 'desc' };
      break;
    default:
      orderByClause = { createdAt: 'desc' };
  }

  const groups = await prisma.group.findMany({
    where: {
      name: { contains: searchgroupname, mode: 'insensitive' },
    },
    select: {
      id: true,
      name: true,
      ownerNickname: true,
      description: true,
      photo: true,
      goalRep: true,
      discordURL: true,
      invitationURL: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      memberCount: true,
      groupTags: {
        select: {
          contents: true,
        },
      },
      _count: { select: { members: true } },
    },
    orderBy: orderByClause,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  const total = await prisma.group.count({
    data: groups.id,
  });

  res.status(200).send({
    data: groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description || '',
      photo: group.photo || '',
      goalRep: group.goalRep,
      discordURL: group.discordURL,
      invitationURL: group.invitationURL,
      likeCount: group.likeCount,
      groupTags: group.groupTags.map(groupTag => ({
        contents: JSON.parse(groupTag.contents),
      })),
      owner: {
        id: group.ownerNickname,
        nickname: group.ownerNickname,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
      },
      memberCount: [],
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      groupBadge: [],
    })),
    total,
  });
});

export const getGroupDetail = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      groupTags: {
        select: {
          contents: true,
        },
      },
      members: {
        select: {
          id: true,
          nickName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      groupBadge: {
        select: {
          groupBadgeId: true,
          groupBadgeName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      ownerPassword: false,
    },
  });

  res.status(200).send(group);
});

export const createGroup = catchHandler(async (req, res) => {
  const [error, validatedData] = validate(req.body, CreateGroupSchema);

  if (error) {
    const message = validationError(error);
    return res.status(400).send({ message });
  }

  const { ownerNickname, ownerPassword, name, description, photo, goalRep, discordURL, invitationURL, tags } =
    validatedData;

  const existNickName = await prisma.members.findFirst({
    where: { nickName: ownerNickname },
  });

  if (existNickName) {
    return res.status(400).send({ message: '이미 존재하는 닉네임입니다.' });
  }

  const existName = await prisma.group.findFirst({
    where: { name },
  });

  if (existName) {
    return res.status(400).send({ message: '이미 존재하는 그룹명입니다.' });
  }

  const newGroup = await prisma.group.create({
    data: {
      name,
      ownerNickname,
      ownerPassword,
      description,
      photo,
      goalRep,
      discordURL,
      invitationURL,
      likeCount: 0,
      memberCount: 1,
      groupTags: {
        create: {
          contents: JSON.stringify(tags),
        },
      },
      members: {
        create: {
          nickName: ownerNickname,
          password: ownerPassword,
        },
      },
    },
    include: { members: true, groupBadge: true, groupTags: true },
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
    ownerNickname: newGroup.ownerNickname,
    groupTags: newGroup.groupTags.map(groupTag => ({
      id: groupTag.id,
      contents: JSON.parse(groupTag.contents),
    })),
    members: newGroup.members.map(member => ({
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

export const updateGroup = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { ownerNickname, ownerPassword, name, description, photo, goalRep, discordURL, invitationURL, tags } = req.body;

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { members: true, groupBadge: true },
  });

  if (!group) return res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });

  if (ownerNickname !== group.ownerNickname || ownerPassword !== group.ownerPassword) {
    return res.status(401).send({ message: '닉네임 또는 비밀번호가 일치하지 않습니다.' });
  }

  if (typeof goalRep !== 'number') {
    return res.status(400).send({ message: '목표 횟수는 숫자여야 합니다.' });
  }

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: {
      name,
      description,
      photo,
      goalRep,
      discordURL,
      invitationURL,
      groupTags: {
        updateMany: {
          where: { groupId },
          data: { contents: JSON.stringify(tags) },
        },
      },
    },
    include: { members: true, groupBadge: true, groupTags: true },
  });

  const result = {
    id: updatedGroup.id,
    name: updatedGroup.name,
    description: updatedGroup.description,
    photo: updatedGroup.photo,
    goalRep: updatedGroup.goalRep,
    discordURL: updatedGroup.discordURL,
    invitationURL: updatedGroup.invitationURL,
    likeCount: updatedGroup.likeCount,
    ownerNickname: updatedGroup.ownerNickname,
    groupTags: updatedGroup.groupTags.map(groupTag => ({
      id: groupTag.id,
      contents: JSON.parse(groupTag.contents),
    })),
    members: updatedGroup.members.map(member => ({
      id: member.id,
      nickname: member.nickName,
      createdAt: new Date(member.createdAt).getTime(),
      updatedAt: new Date(member.updatedAt).getTime(),
    })),
    createdAt: new Date(updatedGroup.createdAt).getTime(),
    updatedAt: new Date(updatedGroup.updatedAt).getTime(),
    badges: updatedGroup.badge ? [updatedGroup.badge.badgeId] : [],
  };

  return res.status(200).send(result);
});

export const deleteGroup = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { ownerNickname, ownerPassword } = req.body;

  const group = await prisma.group.findUnique({ where: { id: groupId } });

  if (!group) return res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });

  if (ownerNickname !== group.ownerNickname || ownerPassword !== group.ownerPassword) {
    return res.status(401).send({ message: '닉네임 또는 비밀번호가 일치하지 않습니다.' });
  }
  console.log(group);
  await prisma.group.delete({ where: { id: groupId } });

  return res.status(200).send({ message: '그룹이 삭제되었습니다.' });
});
