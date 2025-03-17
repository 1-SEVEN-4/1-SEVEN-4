import express from 'express';
import { createRecord } from '../controllers/recordController.js';
import { getRecordDetail } from '../controllers/recordController.js';
import { startTimer } from '../controllers/timeController.js';

const recordRoute = express.Router();

recordRoute.get('/:groupId/records/:recordId', getRecordDetail);
recordRoute.patch('/:recordId/records', createRecord);
recordRoute.post('/:groupId/start', startTimer);

export default recordRoute;
