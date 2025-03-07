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
        message: `The orderBy parameter must be one of the following values: ['recommendation', 'participantCount', 'createdAt'].`,
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
        ownerNickName: true,
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
          id: group.ownerNickName,
          nickname: group.ownerNickName,
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
      message: 'Internal Server Error. Please try again later.',
    });
  }
}
