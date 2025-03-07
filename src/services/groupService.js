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

export const updateGroup = async (
  groupId,
  ownerNickName,
  ownerPassword,
  updateData,
) => {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) throw { status: 404, message: '그룹을 찾을 수 없습니다.' };

  if (ownerNickName !== group.ownerNickName) {
    throw { status: 401, message: '닉네임 혹은 비밀번호를 확인해주세요.' };
  }

  if (ownerPassword !== group.ownerPassword) {
    throw { status: 401, message: '닉네임 혹은 비밀번호를 확인해주세요.' };
  }

  if (typeof updateData.goalCount !== 'number') {
    throw { status: 404, message: '목표 횟수는 숫자여야 합니다.' };
  }

  const updateGroup = await prisma.group.update({
    where: { id: groupId },
    data: updateData,
  });

  return updateGroup;
};

export const deleteGroup = async (groupId, ownerPassword) => {
  const group = await prisma.group.findUnique({ where: { id: groupId } });

  if (!group) {
    throw { status: 404, message: '그룹을 찾을 수 없습니다.' };
  }

  if (ownerPassword !== group.ownerPassword) {
    throw { status: 401, message: '닉네임 혹은 비밀번호를 확인해주세요' };
  }

  await prisma.group.delete({ where: { id: groupId } });
};
