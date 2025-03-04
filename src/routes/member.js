import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateLoginCondition, validateLoginInfo } from './validateLogin.js';

const prisma = new PrismaClient();
const memberRouter = express.Router();

memberRouter.route('/').post(validateLoginCondition(), async (req, res) => {
  const member = await prisma.member.create({
    data: req.body,
  });
  res.status(201).send(member);
});

memberRouter.route('/:id').delete(validateLoginInfo(), async (req, res) => {
  const { id } = req.params;

  await prisma.member.delete({
    where: { id },
  });
  res.status(204).send();
});

export default memberRouter;
