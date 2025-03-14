import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';
import { checkAndAssignBadge } from  './groupbadgeController.js';

export const createMember = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { nickName, password } = req.body;

  const newMember = await prisma.members.create({
    data: {
      nickName,
      password,
      groupId,
    },
  });
  await checkAndAssignBadge(groupId);
  res.status(201).send(newMember);
});

export const getMember = catchHandler(async (req, res) => {
  const { groupId } = req.params;

  const member = await prisma.members.findMany({
    where: { groupId },
  });

  res.status(200).send(member);
});

export const deleteMember = catchHandler(async (req, res) => {
  const { groupId } = req.params;
  const { nickName } = req.body;

  const member = await prisma.members.findFirst({
    where: { groupId, nickName },
  });

  await prisma.members.delete({
    where: { id: member.id },
  });

  res.status(204).send();
});
