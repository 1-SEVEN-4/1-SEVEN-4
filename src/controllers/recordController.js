import prisma from '../config/prisma.js';
import { stopTimer } from '../util/timeUtil.js';
import discordNotice from '../util/noticeUtil.js';
import { catchHandler } from '../lib/catchHandler.js';
import { PORT } from '../config/index.js';

export const createRecord = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { sports, description, distance, photo, nickName, password } = req.body;

  const member = await prisma.members.findFirst({
    where: { groupId, nickName },
  });

  console.log(groupId, nickName);
  if (!member) {
    return res.status(400).send({ message: '닉네임 확인해주세요.' });
  }

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (member.password !== password) {
    return res.status(400).send({ message: '비밀번호를 확인해주세요.' });
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
    },
  });

  const response = {
    id: record.id,
    sports,
    description,
    time: record.time,
    distance,
    photo: record.photo.map(photoPath => {
      return `http://localhost:${PORT}${photoPath}`;
    }),
    members: {
      id: member.id,
      nickName: member.nickName,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      groupId,
    },
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
  discordNotice(group.invitationURL, group.name, nickName);
  res.status(201).send(response);
});

export const getRecordDetail = async (req, res) => {
  const { groupId, recordId } = req.params;

  if (isNaN(groupId) || isNaN(recordId)) {
    return res.status(400).send({
      message: '그룹Id는 숫자여야 합니다.',
    });
  }

  const record = await prisma.record.findUnique({
    where: { id: recordId },
    select: {
      id: true,
      sports: true,
      description: true,
      time: true,
      distance: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
      member: {
        select: {
          id: true,
          nickName: true,
        },
      },
    },
  });

  if (!record) {
    return res.status(404).send({
      message: '기록을 찾을 수 없습니다.',
    });
  }

  res.status(200).send({
    id: record.id,
    sports: record.sports,
    description: record.description || {},
    time: record.time,
    distance: record.distance,
    photo: record.photo ? record.photo.split(',') : [],
    members: {
      id: record.member.id,
      nickname: record.member.nickName,
    },
  });
};
