import express from 'express';
import { createGroup, updateGroup, deleteGroup } from '../controllers/groupController.js';

const groupRoute = express.Router();

groupRoute.post('/', createGroup);
groupRoute.put('/:groupId', updateGroup);
groupRoute.delete('/:groupId', deleteGroup);

export default groupRoute;
