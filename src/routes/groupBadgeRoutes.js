import express from 'express';
import { updateLikeCount, getGroupBadges } from '../controllers/groupbadgeController.js';

const badgeRouter = express.Router();

badgeRouter.patch('/:name/likeCounter',updateLikeCount);
badgeRouter.get('/:name/groupBadges',getGroupBadges);

export default badgeRouter;
