import express from 'express';
import getRecordList from '../controllers/recordListController.js';
import validateGroupId from '../lib/validator/validateGroupId.js';

const recordListRoutes = express.Router();
recordListRoutes.get('/:groupId/records/recordId', getRecordList);


export default recordListRoutes;
