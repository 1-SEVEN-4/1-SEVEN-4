import express from 'express';
import getRecordList from '../controllers/recordListController.js';
import validateGroupId from '../lib/validator/validateGroupId.js';
import validateLoginCondition from '../lib/validator/validateLoginCondition.js';
import validateLoginInfo from '../lib/validator/validateLoginInfo.js';

const recordListRoutes = express.Router();

recordListRoutes.get('/:groupId/records', validateGroupId, getRecordList);

export default recordListRoutes;
