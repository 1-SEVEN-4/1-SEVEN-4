import prisma from '../config/prisma.js';
import { timeInt, formatTime } from '../util/timeUtil.js';
import discordNotice from '../util/noticeUtil.js';
import { catchHandler } from '../lib/catchHandler.js';
import { PORT } from '../config/index.js';

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

  const timerData = timeInt();
  const { elapsedSeconds } = timerData;

  const record = await prisma.record.create({
    data: {
      sports,
      description,
      time: elapsedSeconds,
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
    distance,
    time: formatTime(record.time),
    photo: record.photo.map(photoPath => {
      return `${PORT}/${photoPath}`;
    }),
    members: {
      memberId: member.id,
      nickName: member.nickName,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      groupId,
    },
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
  discordNotice(group.name, nickName);
  res.status(201).send(response);
});

export async function getRecordDetail(req, res) {
  try {
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
      time: formatTime(record.time),
      distance: record.distance,
      photo: record.photo ? record.photo.split(',') : [],
      members: {
        id: record.member.id,
        nickname: record.member.nickName,
      },
    });
  } catch (error) {
    console.error('Error fetching record details:', error);
    res.status(500).send({
      message: '서버에 문제가 발생했습니다.',
    });
  }
}
