import express from 'express';
import { badLikeCount, goodLikeCount } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.post('/:id/likes', goodLikeCount);
groupRoute.delete('/:id/likes', badLikeCount);

export default groupRoute;
