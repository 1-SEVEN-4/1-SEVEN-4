import express from 'express';
import {
  updateLikeCount,
  getGroupBadges,
} from '../controller/LikeController.js';

const LikeRouter = express.Router();

LikeRouter.route('/:name/:likecounter').patch(updateLikeCount);
LikeRouter.route('/:name/:groupbadges').get(getGroupBadges);

export default LikeRouter;
