import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function validateLoginCondition() {
  return async (req, res, next) => {
    try {
      const regExpNickname = /^[A-Za-z0-9\uAC00-\uD7A3]{4,12}$/;
      const regExpPassword =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{4,16}$/;

      const { memberNickname, memberPassword } = await req.body;

      if (!regExpNickname.test(memberNickname)) {
        return res.status(400).json({ message: '닉네임이 유효하지 않습니다.' });
      }

      if (!regExpPassword.test(memberPassword)) {
        return res
          .status(400)
          .json({ message: '비밀번호가 유효하지 않습니다.' });
      }
      return next();
    } catch (e) {
      console.log('Error occured', e);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    } finally {
      console.log('Finished');
    }
  };
}

export function validateLoginInfo() {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { memberNickname, memberPassword } = req.body;

      const member = await prisma.member.findUnique({
        where: { id },
      });

      if (!member) {
        return res
          .status(404)
          .json({ message: '회원 정보를 찾을 수 없습니다.' });
      }

      if (member.memberNickname !== memberNickname) {
        return res.status(403).json({ message: '닉네임이 일치하지 않습니다.' });
      }

      if (member.memberPassword !== memberPassword) {
        return res
          .status(403)
          .json({ message: '비밀번호가 일치하지 않습니다.' });
      }
      return next();
    } catch (error) {
      console.error('Error deleting member:', error);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    } finally {
      console.log('Finished');
    }
  };
}
