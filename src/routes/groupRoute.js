import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const groupRoute = express.Router()

groupRoute.route('/').get(async (req, res) => {
  const { offset = 0, limit = 10, order = 'newest' } = req.query
  let orderBy
  switch (order) {
    case 'oldest':
      orderBy = { createdAt: 'asc' }
      break
    case 'newest':
    default:
      orderBy = { createdAt: 'desc' }
  }
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      groupName: true,
      nickName: true,
      photo: true,
      tag: true,
      goalCount: true,
      recommendation: true,
    },
    orderBy,
    skip: offset,
    take: limit,
  })
  res.status(200).send(groups)
})

groupRoute.route('/:id').get(async (req, res) => {
  const { id } = req.params
  const group = await prisma.group.findUnique({
    where: { id },
  })
  res.status(200).send(group)
})

groupRoute.route('/:id/likes').post(async (req, res) => {
  const { id } = req.params
  const group = await prisma.group.findUnique({
    where: { id },
  })

  group.recommendation += 1

  const updategroup = await prisma.group.update({
    where: { id: group.id },
    data: { recommendation: group.recommendation },
  })

  res.status(201).send(updategroup)
})

export default groupRoute
