import prisma from '../../config/prisma.js';

export default async function validateLoginInfo(req, res, next) {
  try {
    const { id, groupId } = req.params;
    const { nickName, password } = req.body;

    const member = await prisma.members.findUnique({
      where: { id, groupId, nickName },
    });

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
  }
}
