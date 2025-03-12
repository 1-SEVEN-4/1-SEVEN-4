import { prisma } from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export const getGroupDetail = catchHandler(async (req, res) => {
  const { id } = req.params;
  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      members: {
        select: {
          id: true,
          nickName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      groupBadge: true,
      ownerPassword: false,
    },
  });

  res.status(200).send(group);
});
