import express from 'express';
import { createGroup, updateGroup, deleteGroup } from '../controller/groupController.js';

const router = express.Router();

router.post('/', createGroup);
router.put('/:groupId', updateGroup);
router.delete('/:groupId', deleteGroup);

export default router;
