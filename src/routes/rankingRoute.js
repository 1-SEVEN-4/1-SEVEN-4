import express from 'express';
import rankingController from '../controllers/rankingController.js';

const rankingsRoute = express.Router();

rankingsRoute.get('/:groupId/ranking/weekly', rankingController.getWeeklyRanking);
rankingsRoute.get('/:groupId/ranking/monthly', rankingController.getMonthlyRanking);
export default rankingsRoute;
