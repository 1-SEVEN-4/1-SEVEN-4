import express from 'express';
import { createRecord } from '../controllers/recordController.js';
import { getRecordDetail } from '../controllers/recordController.js';
import validateGroupId from '../lib/validator/validateGroupId.js';
import validateLoginInfo from '../lib/validator/validateLoginInfo.js';
import { startTimer } from '../controllers/timeController.js';

const recordRoute = express.Router();

recordRoute.get('/:groupId/records/:recordId', validateGroupId, getRecordDetail);
recordRoute.post('/:groupId/records', validateGroupId, validateLoginInfo);
recordRoute.post('/:groupId/start', startTimer);
recordRoute.patch(':/recordId/records', createRecord);

export default recordRoute;
