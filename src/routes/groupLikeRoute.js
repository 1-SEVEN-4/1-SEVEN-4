import express from 'express';
import { likeCount, unLikeCount } from '../controllers/groupLikeController.js';

const groupRoute = express.Router();

groupRoute.post('/:id/likes', likeCount);
groupRoute.delete('/:id/likes', unLikeCount);

export default groupRoute;
