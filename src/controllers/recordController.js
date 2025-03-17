import prisma from '../config/prisma.js';
import { timeInt, formatTime } from './timeController.js';
import discordNotice from './noticeController.js';
import { catchHandler } from '../lib/catchHandler.js';
import { PORT } from '../config/index.js';
import { checkAndAssignBadge } from './groupbadgeController.js';

export const createRecord = catchHandler(async (req, res) => {
  const { recordId } = req.params;
  const { sports, description, distance, photo, nickName, password } = req.body;

  if (!sports) {
    return res.status(400).send({ message: '운동 종류(sports)를 입력해주세요.' });
  }

  if (!description) {
    return res.status(400).send({ message: '기록 설명(description)을 입력해주세요.' });
  }

  if (distance === undefined || distance === null) {
    return res.status(400).send({ message: '운동 거리(distance)를 입력해주세요.' });
  }

  if (!photo || photo.length === 0) {
    return res.status(400).send({ message: '운동 사진(photo)을 입력해주세요.' });
  }

  const record = await prisma.record.findFirst({
    where: { id: recordId },
    include: {
      members: true,
      groups: true,
    },
  });

  if (!record) {
    return res.status(400).send({ message: '스톱워치가 시작되지 않았습니다.' });
  }

  const member = await prisma.members.findUnique({
    where: {
      nickName,
      groupId: record.groupId,
    },
  });

  if (!member) {
    return res.status(400).send({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
  } else if (member.password !== password) {
    return res.status(400).send({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
  }

  const end = new Date();
  const { elapsedSeconds } = timeInt(record.startTime, end);

  const updateRecord = await prisma.record.update({
    where: { id: recordId },
    data: {
      sports,
      description,
      endTime: end,
      time: elapsedSeconds,
      distance,
      photo: { set: photo },
      members: {
        connect: { id: member.id },
      },
    },
  });

  const response = {
    id: record.id,
    sports: record.sports,
    description: record.description,
    time: formatTime(updateRecord.time),
    distance: record.distance,
    photo: updateRecord.photo.map(photoPath => {
      return `http://localhost:${PORT}${photoPath}`;
    }),
    members: {
      id: member.id,
      nickName: member.nickName,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      groupId: record.groupId,
    },
    createdAt: record.createdAt,
    updatedAt: updateRecord.updatedAt,
  };
  discordNotice(record.groups.invitationURL, record.groups.name, member.nickName);
  await checkAndAssignBadge(record.groupId);

  res.status(201).send(response);
});

export const getRecordDetail = catchHandler(async (req, res) => {
  const { groupId, recordId } = req.params;
  const record = await prisma.record.findUnique({
    where: { id: recordId },
    select: {
      id: true,
      sports: true,
      description: true,
      time: true,
      distance: true,
      photo: true, // photo 필드는 이미 배열로 반환됩니다.
      createdAt: true,
      updatedAt: true,
      members: {
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

  // photo는 이미 배열로 저장되어 있으므로 그대로 반환합니다.
  res.status(200).send({
    id: record.id,
    sports: record.sports,
    description: record.description || {},
    time: formatTime(record.time),
    distance: record.distance,
    photo: record.photo.map(photoPath => {
      return `${PORT}/${photoPath}`; // 각 사진 경로를 포트와 결합하여 반환
    }),
    members: {
      id: record.members.id,
      nickname: record.members.nickName,
    },
  });
});
