import prisma from '../../config/prisma.js';
import { catchHandler } from '../catchHandler.js';

const validateLoginCondition = catchHandler(async (req, res, next) => {
  const regExpNickName = /^[A-Za-z0-9\uAC00-\uD7A3]{2,10}$/;
  const regExpPassword = /^[a-zA-Z\d!@#$%^&*()]{4,16}$/;

  const { nickName, password } = await req.body;

  const memberCheck = await prisma.members.findFirst({
    where: {
      nickName,
    },
  });

  if (memberCheck) {
    return res.status(400).send({ message: '이미 존재하는 닉네임입니다.' });
  }

  if (!regExpNickName.test(nickName)) {
    return res.status(400).send({ message: '닉네임은 2자 이상 10자 이하로 입력해 주세요.' });
  }

  if (!regExpPassword.test(password)) {
    return res.status(400).send({ message: '비밀번호는 4자 이상 16자 이하로 입력해주세요.' });
  }

  return next();
});

export default validateLoginCondition;
