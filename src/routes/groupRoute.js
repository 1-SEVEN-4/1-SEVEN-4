import express from 'express';
import {
  badLikeCount,
  getGroupList,
  goodLikeCount,
} from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.get('/', getGroupList);
groupRoute.post('/:id/likes', goodLikeCount);
groupRoute.delete('/:id/likes', badLikeCount);

export default groupRoute;
