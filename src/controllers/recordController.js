import { Prisma, PrismaClient } from '@prisma/client';
import { stopTimer } from './timeController.js';
import discordNotice from './noticeController.js';

const prisma = new PrismaClient();

export async function createRecord(req, res) {
  try {
    const { groupId } = req.params;
    const { sports, description, distance, photo, nickName, password } =
      req.body;

    // 사용자 인증 및 타이머
    const member = await prisma.members.findFirst({
      where: { groupId, nickName },
    });

    if (!member) {
      return res
        .status(400)
        .send({ message: '해당 그룹에 등록된 유저가 아닙니다.' });
    }

    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (member.password !== password) {
      return res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const timerData = stopTimer();
    const { elapsedSeconds, elapsedTime } = timerData;

    // 레코드 생성
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
      memberId: member.id,
      nickName,
    };
    discordNotice(group.name, nickName);
    res.status(201).send(response);
  } catch (error) {
    console.error('Error creating record:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res
        .status(400)
        .send({ message: `Prisma Error: ${error.message}` });
    } else {
      return res.status(500).send({
        message: `서버에 문제가 발생했습니다. 상세 오류: ${error.message}`,
      });
    }
  }
}
