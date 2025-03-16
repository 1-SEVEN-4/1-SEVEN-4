import prisma from '../config/prisma.js';
import { timeInt, formatTime } from '../util/timeUtil.js';
import discordNotice from '../util/noticeUtil.js';
import { catchHandler } from '../lib/catchHandler.js';
import { PORT } from '../config/index.js';
import { checkAndAssignBadge } from './groupbadgeController.js';

export const createRecord = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { sports, description, distance, photo, nickName, password } = req.body;

  const member = await prisma.members.findFirst({
    where: { groupId, nickName },
  });

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  const timerData = timeInt();
  const { elapsedSeconds } = timerData;

  const record = await prisma.record.create({
    data: {
      sports,
      description,
      time: elapsedSeconds,
      distance,
      photo, // photo는 이미 배열로 저장되고 처리됩니다.
      memberId: member.id,
      groupId,
    },
  });

  const response = {
    id: record.id,
    sports,
    description,
    time: formatTime(record.time),
    distance,
    photo: record.photo.map(photoPath => {
      return `http://localhost:${PORT}${photoPath}`;
    }),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    members: {
      id: member.id,
      nickName: member.nickName,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      groupId,
    },
  };
  discordNotice(group.invitationURL, group.name, nickName);
  await checkAndAssignBadge(groupId);

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
