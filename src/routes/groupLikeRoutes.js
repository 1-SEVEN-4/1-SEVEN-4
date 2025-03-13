import express from 'express';
import { likeCount, unLikeCount } from '../controllers/groupLikeController.js';

const groupRoute = express.Router();

groupRoute.post('/:groupId/likes', likeCount);
groupRoute.delete('/:groupId/likes', unLikeCount);

export default groupRoute;
