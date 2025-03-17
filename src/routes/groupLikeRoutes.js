import express from 'express';
import { likeCount, unLikeCount } from '../controllers/groupLikeController.js';

const groupLikeRoute = express.Router();

groupLikeRoute.post('/:groupId/likes', likeCount);
groupLikeRoute.delete('/:groupId/likes', unLikeCount);

export default groupLikeRoute;
