import { PORT } from "../config/index.js";
import prisma from "../config/prisma.js";
import { catchHandler } from "../lib/catchHandler.js";

export const createRecord = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { sports, description, distance, photo, nickName, password } = req.body;

  const member = await prisma.members.findFirst({
    where: { groupId, nickName },
  });

  if (!member) {
    return res.status(400).send({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
  }

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (member.password !== password) {
    return res.status(400).send({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
  }

  const timerData = timeInt();
  const { elapsedSeconds } = timerData;

  const record = await prisma.record.create({
    data: {
      sports,
      description,
      time: elapsedSeconds,
      distance,
      photo,  // photo는 이미 배열로 저장되고 처리됩니다.
      memberId: member.id,
      groupId,
    },
  });

  const response = {
    id: record.id,
    sports,
    description,
    photo: record.photo.map(photoPath => {
      return `${PORT}/${photoPath}`;  // 배열의 각 항목에 대해 URL을 처리
    }),
    members: {
      id: record.members[0].id,  // 배열에서 첫 번째 멤버를 선택
      nickname: record.members[0].nickName,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      groupId,
    },
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
  discordNotice(group.name, nickName);

  await checkAndAssignBadge(groupId);
  res.status(201).send(response);
});

export async function getRecordDetail(req, res) {
  try {
    const { groupId, recordId } = req.params;
    console.log(recordId);
    const record = await prisma.record.findUnique({
      where: { id: recordId },
      select: {
        id: true,
        sports: true,
        description: true,
        time: true,
        distance: true,
        photo: true,  // photo 필드는 이미 배열로 반환됩니다.
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
      time: record.time,
      distance: record.distance,
      photo: record.photo.map(photoPath => {
        return `${PORT}/${photoPath}`;  // 각 사진 경로를 포트와 결합하여 반환
      }),
      members: {
        id: record.members.id,
        nickname: record.members.nickName,
      },
    });
  } catch (error) {
    console.error('Error fetching record details:', error);
    res.status(500).send({
      message: '서버에 문제가 발생했습니다.',
    });
  }
}
