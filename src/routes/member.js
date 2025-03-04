import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validationLoginCondition, confirmLoginInfo } from './confirmLogin.js';

const prisma = new PrismaClient();
const memberRouter = express.Router();

memberRouter.route('/').post(validationLoginCondition(), async (req, res) => {
  const member = await prisma.member.create({
    data: req.body,
  });
  res.status(201).send(member);
});

memberRouter.route('/:id').delete(confirmLoginInfo(), async (req, res) => {
  const { id } = req.params;

  await prisma.member.delete({
    where: { id },
  });
  res.status(204).send();
});

export default memberRouter;
