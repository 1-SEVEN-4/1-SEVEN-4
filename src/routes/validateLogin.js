import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function validateLoginCondition() {
  return async (req, res, next) => {
    try {
      const regExpNickname = /^[A-Za-z0-9\uAC00-\uD7A3]{2,10}$/;
      const regExpPassword = /^[a-zA-Z\d!@#$%^&*()]{4,16}$/;

      const { nickname, password } = await req.body;
      const member = await prisma.member.findMany();

      if (!regExpNickname.test(nickname)) {
        return res
          .status(400)
          .json({ message: '닉네임은 2자 이상 10자 이하로 입력해 주세요.' });
      }

      if (!regExpPassword.test(password)) {
        return res
          .status(400)
          .json({ message: '비밀번호는 4자 이상 16자 이하로 입력해주세요.' });
      }

      if (member.nickname !== nickname) {
        return res
          .status(400)
          .json({ message: '중복되는 닉네임이 존재합니다.' });
      }
      return next();
    } catch (e) {
      console.log('Error occured', e);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    } finally {
      console.log('Finished');
    }
  };
}

export function validateLoginInfo() {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nickname, password } = req.body;

      const member = await prisma.member.findUnique({
        where: { id },
      });

      if (!member) {
        return res
          .status(404)
          .json({ message: '회원 정보를 찾을 수 없습니다.' });
      }

      if (member.nickname !== nickname || member.password !== password) {
        return res
          .status(401)
          .json({ message: '닉네임 혹은 비밀번호를 다시 확인주세요.' });
      }

      return next();
    } catch (error) {
      console.error('Error deleting member:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    } finally {
      console.log('Finished');
    }
  };
}
