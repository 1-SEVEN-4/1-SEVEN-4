import { prisma } from '../config/prisma.js';
import { stopTimer } from '../utils/timeUtil.js';
import discordNotice from '../utils/noticeUtil.js';
import { catchHandler } from '../lib/catchHandler.js';

export const createRecord = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { sports, description, distance, photo, nickName, password } = req.body;

  const member = await prisma.members.findFirst({
    where: { groupId, nickName },
  });

  if (!member) {
    return res
      .status(400)
      .send({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
  }

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (member.password !== password) {
    return res
      .status(400)
      .send({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
  }

  const timerData = stopTimer();
  const { elapsedSeconds, elapsedTime } = timerData;

  const record = await prisma.record.create({
    data: {
      sports,
      description,
      time: elapsedTime,
      distance,
      photo,
      memberId: member.id,
      groupId,
      nickName,
      password,
    },
  });

  const response = {
    id: record.id,
    sports,
    description,
    photo: record.photo.map(photopath => {
      return `http://localhost:3000${photopath}`;
    }),
    members: {
      memberId: member.id,
      nickName,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      groupId,
    },
    createdAt,
    updatedAt,
  };
  discordNotice(group.name, nickName);
  res.status(201).send(response);
});
