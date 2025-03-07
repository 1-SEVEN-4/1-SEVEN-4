import express from 'express';
import {
  createMember,
  deleteMember,
  getMember,
} from '../controllers/memberController.js';

import validateGroupId from '../validator/validateGroupId.js';
import validateLoginCondition from '../validator/validateLoginCondition.js';
import validateLoginInfo from '../validator/validateLoginInfo.js';

const groupRouter = express.Router();

groupRouter.post(
  '/:groupId/members',
  validateLoginCondition,
  validateGroupId,
  createMember,
);
groupRouter.get('/:groupId/members', validateGroupId, getMember);
groupRouter.delete(
  '/:groupId/members',
  validateGroupId,
  validateLoginInfo,
  deleteMember,
);

export default groupRouter;
