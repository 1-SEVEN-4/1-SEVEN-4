import prisma from '../config/prisma';
import { create, validate } from 'superstruct';
import { CreateGroupSchema } from '../util/superstruct';

export const createGroup = async data => {
  try {
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
  } catch (e) {
    console.error(`그룹 생성 오류: ${e.message}`);

    if (e.message.includes('닉네임') || e.message.includes('패스워드')) {
      throw { status: 400, message: e.message };
    }

    throw { status: 500, message: '서버에 문제가 발생했습니다.' };
  }

  return newGroup;
};
