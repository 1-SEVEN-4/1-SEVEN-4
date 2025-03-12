import express from 'express';
import { createGroup, updateGroup, deleteGroup, getGroupDetail, getGroup } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.get('/', getGroup);
groupRoute.get('/:id', getGroupDetail);
groupRoute.post('/', createGroup);
groupRoute.patch('/:groupId', updateGroup);
groupRoute.delete('/:groupId', deleteGroup);

export default groupRoute;
