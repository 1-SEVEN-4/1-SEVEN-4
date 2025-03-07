import prisma from '../config/prisma.js';
import { validate } from 'superstruct';
import { CreateGroupSchema } from '../util/superstruct.js';
import { catchHandler } from '../lib/catchHandler.js';

export const createGroup = catchHandler(async (req, res) => {
  const [validateData, error] = validate(req.body, CreateGroupSchema);
  if (error) return res.status(400).send({ message: error.message });

  const existNickName = await prisma.members.findUnique({
    where: { nickName: validateData.ownerNickName },
  });

  if (existNickName) {
    return res.status(400).send({ message: '이미 존재하는 닉네임입니다.' });
  }

  const newGroup = await prisma.group.create({
    data: {
      ...req.body,
      likeCount: 0,
      memberCount: 1,
      badgeId: '',
      Members: {
        create: {
          nickName: req.body.ownerNickName,
          password: req.body.password,
        },
      },
    },
  });

  return res.status(201).send(newGroup);
});

export const updateGroup = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { ownerNickName, ownerPassword, updateData } = req.body;

  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) return res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });

  if (ownerNickName !== group.ownerNickName || ownerPassword !== group.ownerPassword) {
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 확인해주세요.' });
  }

  if (typeof updateData.goalCount !== 'number') {
    return res.status(400).send({ message: '목표 횟수는 숫자여야 합니다.' });
  }

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: updateData,
  });

  return res.status(200).send(updatedGroup);
});

export const deleteGroup = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { ownerPassword } = req.body;

  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) return res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });

  if (ownerPassword !== group.ownerPassword) {
    return res.status(401).send({ message: '닉네임 혹은 비밀번호를 확인해주세요' });
  }

  await prisma.group.delete({ where: { id: groupId } });
  return res.status(200).send({ message: '그룹이 삭제되었습니다.' });
});
