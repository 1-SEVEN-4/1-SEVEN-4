import express from 'express';
import { updateLikeCount, getGroupBadges } from '../controllers/groupbadgeController.js';

const badgeRouter = express.Router();

badgeRouter.route('/:name/likeCounter').patch(updateLikeCount);
badgeRouter.route('/:name/groupBadges').get(getGroupBadges);

export default badgeRouter;
