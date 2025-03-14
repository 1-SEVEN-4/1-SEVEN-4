import express from 'express';
import rankingController from '../controllers/rankingController.js';

const rankingsRoute = express.Router();

rankingsRoute.get('/weekly', rankingController.getWeeklyRanking);
rankingsRoute.get('/monthly', rankingController.getMonthlyRanking);

export default rankingsRoute;
