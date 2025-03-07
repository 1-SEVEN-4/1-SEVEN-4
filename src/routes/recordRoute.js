import express from 'express';
import { createRecord } from '../controllers/recordController.js';
import { startTimer } from '../controllers/timeController.js';

const recordRoute = express.Router();

recordRoute.post('/:groupId/records', createRecord);
recordRoute.post('/start', startTimer);

export default recordRoute;
