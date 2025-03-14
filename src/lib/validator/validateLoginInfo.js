import prisma from '../../config/prisma.js';
import { catchHandler } from '../catchHandler.js';

const validateLoginInfo = catchHandler(async (req, res, next) => {
  const { id, groupId } = req.params;
  const { nickName, password } = req.body;

  const member = await prisma.members.findUnique({
    where: { id, groupId, nickName },
  });

<<<<<<< HEAD
    if (!member) {
      return res.status(401).send({ message: '닉네임 또는 비밀번호가 일치하지 않습니다.' });
    }

    if (member.password !== password) {
      return res.status(401).send({ message: '닉네임 또는 비밀번호가 일치하지 않습니다.' });
    }

    return next();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).send({ message: '서버 오류가 발생하였습니다.' });
  } finally {
    console.log('Finished');
=======
  if (!member) {
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 다시 확인주세요.' });
  }

  if (member.password !== password) {
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 다시 확인주세요.' });
>>>>>>> f8d42dfbd5cf0b6d3e23605b71e1edae9a81c09c
  }

  return next();
});

export default validateLoginInfo;
