import prisma from '../../config/prisma.js';
import { catchHandler } from '../catchHandler.js';

const validateGroupId = catchHandler(async (req, res, next) => {
  const { groupId } = req.params;
  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

<<<<<<< HEAD
    if (!group) {
      return res.status(400).send({ message: '그룹을 찾을 수 없습니다.' });
    }

    return next();
  } catch (e) {
    console.log('Error occured', e);
    return res.status(500).send({ message: '서버 오류가 발생하였습니다.' });
  } finally {
    console.log('Finished');
=======
  if (!group) {
    return res.status(400).send({ message: '그룹이 존재하지 않습니다.' });
>>>>>>> f8d42dfbd5cf0b6d3e23605b71e1edae9a81c09c
  }

  return next();
});

export default validateGroupId;
