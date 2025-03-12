import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRecordDetail(req, res) {
  try {
    const { groupId, recordId } = req.params;

    // groupId와 recordId가 숫자인지 확인
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
  } catch (error) {
    console.error('Error fetching record details:', error);
    res.status(500).send({
      message: '서버에 문제가 발생했습니다.',
    });
  }
}
