import express from 'express';
import getRecordList from '../controller/recordListController.js';

const recordListRoutes = express.Router();

recordListRoutes.get('/', getRecordList);

export default recordListRoutes;
