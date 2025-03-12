import express from 'express';
import { getRecordDetail } from '../controllers/recordController';

const recordDetailRoute = express.Router();

recordDetailRoute.get('/:id', getRecordDetail);

export default recordDetailRoute;
