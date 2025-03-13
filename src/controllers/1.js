import { catchHandler } from '../lib/catchHandler.js';
import { validate } from 'superstruct';
import { CreateGroupSchema, validationError } from '../util/superstruct.js';
import prisma from '../config/prisma.js';

export async function getGroup(req, res) {
  try {
    const { page = 1, limit = 10, order = 'newest', orderBy = 'createdAt', search = '' } = req.query;

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
        name: { contains: search, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        ownerNickname: true,
        description: true,
        photo: true,
        tags: true,
        goalRep: true,
        discordURL: true,
        invitationURL: true,
        likeCount: true,
        createdAt: true,
        updatedAt: true,
        memberCount: true,
        _count: { select: { Members: true } },
      },
      orderBy: orderByClause,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const total = await prisma.group.count({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
    });

    res.status(200).send({
      data: groups.map(group => ({
        id: group.id,
        name: group.name,
        description: group.description || '',
        photoUrl: group.photo || '',
        goalRep: group.goalRep,
        discordWebhookUrl: group.discordURL,
        discordInviteUrl: group.invitationURL,
        likeCount: group.likeCount,
        tags: group.tags || [],
        owner: {
          id: group.ownerNickname,
          nickname: group.ownerNickname,
          createdAt: group.createdAt ? group.createdAt.getTime() : null,
          updatedAt: group.updatedAt ? group.updatedAt.getTime() : null,
        },
        participants: [],
        createdAt: group.createdAt ? group.createdAt.getTime() : null,
        updatedAt: group.updatedAt ? group.updatedAt.getTime() : null,
        badges: [],
      })),
      total,
    });
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).send({
      message: '서버에 문제가 발생했습니다.',
    });
  }
}

export const getGroupDetail = catchHandler(async (req, res) => {
  const { id } = req.params;
  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      members: {
        select: {
          id: true,
          nickName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      groupBadge: true,
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

  // 그룹 이름이 같은 경우도 추가해야함
  const newGroup = await prisma.group.create({
    data: {
      name,
      ownerNickname,
      ownerPassword,
      description,
      photo,
      tags,
      goalRep,
      discordURL,
      invitationURL,
      likeCount: 0,
      memberCount: 1,
      members: {
        create: {
          nickName: ownerNickname,
          password: ownerPassword,
        },
      },
    },
    include: { members: true, groupBadge: true },
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
    ownerNickname: newGroup.ownerNickname,
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
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 확인해주세요.' });
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
      tags,
    },
    include: { members: true, groupBadge: true },
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
    tags: updatedGroup.tags,
    ownerNickname: updatedGroup.ownerNickname,
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
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 확인해주세요.' });
  }

  await prisma.group.delete({ where: { id: groupId } });

  return res.status(200).send({ message: '그룹이 삭제되었습니다.' });
});
