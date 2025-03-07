import express from 'express';
import { getGroupDetail } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.get('/:id', getGroupDetail);

export default groupRoute;
