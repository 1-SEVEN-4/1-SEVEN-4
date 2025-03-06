import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const groupRoute = express.Router();

groupRoute
  .route('/:id/likes')
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const group = await prisma.group.findUnique({
        where: { id },
      });

      const updategroup = await prisma.group.update({
        where: { id },
        data: { likeCount: (group.likeCount += 1) },
      });

      res.status(200).send(updategroup);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2023'
      ) {
        res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
      } else {
        res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
      }
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const group = await prisma.group.findUnique({
        where: { id },
      });

      const updategroup = await prisma.group.update({
        where: { id },
        data: { likeCount: (group.likeCount -= 1) },
      });

      res.status(200).send(updategroup);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2023'
      ) {
        res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
      } else {
        res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
      }
    }
  });

export default groupRoute;
