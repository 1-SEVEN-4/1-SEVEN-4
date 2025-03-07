import express from 'express';
import { PrismaClient } from '@prisma/client';
import {
  validateLoginCondition,
  validateLoginInfo,
  validateGroupId,
} from './validateLogin.js';

const prisma = new PrismaClient();
const groupRouter = express.Router();

groupRouter
  .route('/:groupId/members')
  .post(validateLoginCondition(), validateGroupId(), async (req, res) => {
    const { groupId } = req.params;
    const { nickName, password } = req.body;

    const newMember = await prisma.members.create({
      data: {
        nickName,
        password,
        groupId,
      },
    });

    return res.status(201).json(newMember);
  })
  .get(validateGroupId(), async (req, res) => {
    const { groupId } = req.params;

    const members = await prisma.members.findMany({
      where: {
        groupId,
      },
    });

    return res.status(200).json(members);
  })
  .delete(validateGroupId(), validateLoginInfo(), async (req, res) => {
    const { groupId } = req.params;
    const { nickName } = req.body;

    const member = await prisma.members.findUnique({
      where: { groupId, nickName },
    });

    await prisma.members.delete({
      where: { id: member.id },
    });

    return res.status(204).send();
  });

export default groupRouter;
