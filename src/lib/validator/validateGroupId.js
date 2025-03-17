import prisma from '../../config/prisma.js';
import { catchHandler } from '../catchHandler.js';

const validateGroupId = catchHandler(async (req, res, next) => {
  const { groupId } = req.params;
  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    return res.status(400).send({ message: '그룹이 존재하지 않습니다.' });
  }

  return next();
});

export default validateGroupId;
