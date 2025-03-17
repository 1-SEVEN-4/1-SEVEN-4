import express from 'express';
import rankingController from '../controllers/rankingController.js';
import validateGroupId from '../lib/validator/validateGroupId.js';

const rankingsRoute = express.Router();

rankingsRoute.get('/:groupId/ranking/weekly', validateGroupId, rankingController.getWeeklyRanking);
rankingsRoute.get('/:groupId/ranking/monthly', validateGroupId, rankingController.getMonthlyRanking);
export default rankingsRoute;
