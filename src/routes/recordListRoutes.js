import express from 'express';
import getRecordList from '../controllers/recordListController.js';

const recordListRoutes = express.Router();

recordListRoutes.get('/:groupId/records', getRecordList);

export default recordListRoutes;
