import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function validateLoginCondition(req, res, next) {
  try {
    const regExpNickName = /^[A-Za-z0-9\uAC00-\uD7A3]{2,10}$/;
    const regExpPassword = /^[a-zA-Z\d!@#$%^&*()]{4,16}$/;

    const { groupId } = req.params;

    const { nickName, password } = await req.body;

    const memberCheck = await prisma.members.findFirst({
      where: {
        groupId,
        nickName,
      },
    });

    if (memberCheck) {
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' });
    }

    if (!regExpNickName.test(nickName)) {
      return res
        .status(400)
        .json({ message: '닉네임은 2자 이상 10자 이하로 입력해 주세요.' });
    }

    if (!regExpPassword.test(password)) {
      return res
        .status(400)
        .json({ message: '비밀번호는 4자 이상 16자 이하로 입력해주세요.' });
    }

    return next();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
  }
}

export async function validateLoginInfo(req, res, next) {
  try {
    const { id, groupId } = req.params;
    const { nickName, password } = req.body;

    const member = await prisma.members.findUnique({
      where: { id, groupId, nickName },
    });

    if (!member) {
      return res
        .status(401)
        .json({ message: '회원 닉네임 혹은 비밀번호를 다시 확인주세요.' });
    }

    if (member.password !== password) {
      return res
        .status(401)
        .json({ message: '닉네임 혹은 비밀번호를 다시 확인주세요.' });
    }

    return next();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
  }
}

export async function validateGroupId(req, res, next) {
  try {
    const { groupId } = req.params;
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return res.status(400).json({ message: '그룹이 존재하지 않습니다.' });
    }

    return next();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
  }
}
