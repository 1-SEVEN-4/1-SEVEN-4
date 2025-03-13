import prisma from '../../config/prisma.js';

export default async function validateGroupId(req, res, next) {
  try {
    const { groupId } = req.params;
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return res.status(400).send({ message: '그룹이 존재하지 않습니다.' });
    }

    return next();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
  } finally {
    console.log('Finished');
  }
}
