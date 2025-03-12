import express from 'express';
import {
  badLikeCount,
  goodLikeCount,
} from '../controllers/groupLikeController.js';
import { getGroupDetail } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.get('/:id', getGroupDetail);

export default groupRoute;
