import express from 'express';
import {
  badLikeCount,
  goodLikeCount,
} from '../controllers/groupLikeController.js';
import { getGroupDetail } from '../controllers/groupController.js';
import { createGroup, updateGroup, deleteGroup } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.get('/:id', getGroupDetail);
groupRoute.post('/', createGroup);
groupRoute.patch('/:groupId', updateGroup);
groupRoute.delete('/:groupId', deleteGroup);

export default groupRoute;
