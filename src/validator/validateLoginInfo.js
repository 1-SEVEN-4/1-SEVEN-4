import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function validateLoginInfo(req, res, next) {
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
