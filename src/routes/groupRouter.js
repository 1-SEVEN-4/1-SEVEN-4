import express from 'express';
import { getGroup } from '../controllers/groupcontroller';

const groupRoute = express.Router();

groupRoute.get('/', getGroup);

export default groupRoute;
