import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const groupRoute = express.Router()

groupRoute.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        Members: {
          select: {
            id: true,
            nickName: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        badge: true,
        ownerPassword: false,
      },
    })

    res.status(200).send(group)
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2023'
    ) {
      res.status(404).send({ message: '그룹을 찾을 수 없습니다.' })
    } else {
      res.status(500).send({ message: '서버에 문제가 발생했습니다.' })
    }
  }
})

export default groupRoute
