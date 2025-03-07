import express from 'express';
import { getGroup } from '../controllers/groupController';

const groupRoute = express.Router();

groupRoute.get('/', getGroup);

export default groupRoute;
