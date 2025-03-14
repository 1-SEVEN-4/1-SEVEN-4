import express from 'express';
import { createRecord } from '../controllers/recordController.js';
import { getRecordDetail } from '../controllers/recordController.js';
import { startTimer } from '../util/timeUtil.js';

const recordRoute = express.Router();

recordRoute.get('/:groupId/records/:recordId', getRecordDetail);
recordRoute.post('/:groupId/records', createRecord);
recordRoute.post('/start', startTimer);

export default recordRoute;
