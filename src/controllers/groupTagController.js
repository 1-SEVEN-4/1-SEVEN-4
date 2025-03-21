import prisma from '../config/prisma.js';
import { catchHandler } from '../lib/catchHandler.js';

export const getGroupTags = catchHandler(async (req, res) => {
  const allTags = await prisma.groupTags.findMany({});

  const tags = Array.from(new Map(allTags.map(tag => [tag.contents, tag])).values());
  console.log(tags);

  res.status(200).json(tags);
});

export const getGroupTagsDetail = catchHandler(async (req, res) => {
  const { tagId } = req.params;

  if (!tagId) {
    return res.status(400).send({ message: '태그 아이디가 필요합니다.' });
  }

  const tag = await prisma.groupTags.findUnique({
    where: { id: tagId },
  });

  if (!tag) {
    return res.status(404).send({ message: '태그를 찾을 수 없습니다.' });
  }

  console.log(tag);
  res.status(200).send(tag);
});
