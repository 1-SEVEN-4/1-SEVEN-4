import express from 'express';
import { createGroup, getGroup } from '../controllers/groupController.js';

const groupRouters = express.Router();

groupRouters.get('/', getGroup);
groupRouters.post('/', createGroup);

export default groupRouters;
