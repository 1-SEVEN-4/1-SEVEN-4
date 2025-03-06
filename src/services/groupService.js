import prisma from '../config/prisma.js';
import { validate } from 'superstruct';
import { CreateGroupSchema } from '../util/superstruct.js';

export const createGroup = async data => {
  const [validateData, error] = validate(data, CreateGroupSchema);

  if (error) throw new Error(error.message);

  const existNickName = await prisma.members.findUnique({
    where: { nickName: validateData.ownerNickName },
  });

  if (existNickName) {
    throw new Error('이미 존재하는 닉네임입니다.');
  }

  const newGroup = await prisma.group.create({
    ...data,
    likeCount: 0,
    memberCount: 1,
    badgeId: '',
    Members: {
      create: { nickName: data.ownerNickName, password: hashedPassword },
    },
  });

  return newGroup;
};
