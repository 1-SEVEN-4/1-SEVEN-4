import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export const startTimer = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { sports = 'RUNNING', description = '설명', photo = ['/photo.jpg'], distance = 0 } = req.body;

  const group = await prisma.group.findFirst({
    where: { id: groupId },
  });

  if (!group) {
    return res.status(400).send({ message: '해당 그룹을 찾을 수 없습니다.' });
  }

  const record = await prisma.record.create({
    data: {
      groups: {
        connect: { id: groupId },
      },
      startTime: new Date(),
      endTime: new Date(),
      sports,
      description,
      photo,
      distance,
    },
  });
  res.status(200).send({ recordId: record.id, startTime: record.startTime });
});

export function timeInt(startTime, endTime) {
  const elapsedMilliseconds = endTime - startTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  return { elapsedSeconds };
}

export const formatTime = seconds => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
};
