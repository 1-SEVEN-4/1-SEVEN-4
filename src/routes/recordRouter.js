import express from 'express';
import { getRecordDetail } from '../controllers/recordDetailController';

const recordDetailRoute = express.Router();

recordDetailRoute.get('/:id', getRecordDetail);

export default recordDetailRoute;
