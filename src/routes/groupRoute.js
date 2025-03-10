import express from 'express';
import { BadLikeCount, goodLikeCount } from '../controllers/groupController.js';
import { createGroup, updateGroup, deleteGroup } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.post('/', createGroup);
groupRoute.put('/:groupId', updateGroup);
groupRoute.delete('/:groupId', deleteGroup);
groupRoute.post('/:id/likes', goodLikeCount);
groupRoute.delete('/:id/likes', BadLikeCount);

export default groupRoute;
