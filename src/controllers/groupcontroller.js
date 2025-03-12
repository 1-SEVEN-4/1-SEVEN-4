import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGroup(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      order = 'newest',
      orderBy = 'createdAt',
      search = '',
    } = req.query;

    const validOrderBy = ['recommendation', 'participantCount', 'createdAt'];
    if (!validOrderBy.includes(orderBy)) {
      return res.status(400).send({
        message:
          'orderBy parameter는 values: [‘likeCount’, ‘memberCount’, ‘createdAt’]를 포함해야합니다.',
      });
    }

    let orderByClause;
    switch (orderBy) {
      case 'recommendation':
        orderByClause = { likeCount: 'desc' };
        break;
      case 'participantCount':
        orderByClause = { memberCount: 'desc' };
        break;
      case 'createdAt':
        orderByClause = { createdAt: 'desc' };
        break;
      default:
        orderByClause = { createdAt: 'desc' };
    }

    const groups = await prisma.group.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        ownerNickname: true,
        description: true,
        photo: true,
        tags: true,
        goalRep: true,
        discordURL: true,
        invitationURL: true,
        likeCount: true,
        createdAt: true,
        updatedAt: true,
        memberCount: true,
        _count: { select: { Members: true } },
      },
      orderBy: orderByClause,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const total = await prisma.group.count({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
    });

    res.status(200).send({
      data: groups.map(group => ({
        id: group.id,
        name: group.name,
        description: group.description || '',
        photoUrl: group.photo || '',
        goalRep: group.goalRep,
        discordWebhookUrl: group.discordURL,
        discordInviteUrl: group.invitationURL,
        likeCount: group.likeCount,
        tags: group.tags || [],
        owner: {
          id: group.ownerNickname,
          nickname: group.ownerNickname,
          createdAt: group.createdAt ? group.createdAt.getTime() : null,
          updatedAt: group.updatedAt ? group.updatedAt.getTime() : null,
        },
        participants: [],
        createdAt: group.createdAt ? group.createdAt.getTime() : null,
        updatedAt: group.updatedAt ? group.updatedAt.getTime() : null,
        badges: [],
      })),
      total,
    });
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).send({
      message: '서버에 문제가 발생했습니다.',
    });
  }
}

// export async function getGroupList(req, res) {
//   try {
//     const { offset = 0, limit = 10, order = 'newest', search = '' } = req.query;
//     let orderBy;
//     switch (order) {
//       case 'bestLikeCount':
//         orderBy = { likeCount: 'desc' };
//         break;
//       case 'bestMembers':
//         orderBy = { memberCount: 'desc' };
//         break;
//       case 'oldest':
//         orderBy = { createdAt: 'asc' };
//         break;
//       case 'newest':
//       default:
//         orderBy = { createdAt: 'desc' };
//     }
//     const groups = await prisma.group.findMany({
//       where: {
//         OR: [{ name: { contains: search, mode: 'insensitive' } }],
//       },
//       select: {
//         name: true,
//         ownerNickname: true,
//         photo: true,
//         tags: true,
//         goalRep: true,
//         likeCount: true,
//         memberCount: true,
//       },
//       orderBy,
//       skip: parseInt(offset),
//       take: parseInt(limit),
//     });
//     res.status(200).send(groups);
//   } catch (e) {
//     if (
//       e instanceof Prisma.PrismaClientKnownRequestError &&
//       e.code === 'P2023'
//     ) {
//       res.status(404).send({ message: '그룹을 찾을 수 없습니다.' });
//     } else {
//       res.status(500).send({ message: '서버에 문제가 발생했습니다.' });
//     }
//   }
// }
