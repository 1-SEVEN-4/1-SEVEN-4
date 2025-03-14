import prisma from '../../config/prisma.js';
import { catchHandler } from '../catchHandler.js';

const validateLoginInfo = catchHandler(async (req, res, next) => {
  const { id, groupId } = req.params;
  const { nickName, password } = req.body;

  const member = await prisma.members.findUnique({
    where: { id, groupId, nickName },
  });

  if (!member) {
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 다시 확인주세요.' });
  }

  if (member.password !== password) {
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 다시 확인주세요.' });
  }

  return next();
});

export default validateLoginInfo;
