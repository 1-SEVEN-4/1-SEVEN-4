import express from 'express';
import {
  createMember,
  deleteMember,
  getMember,
} from '../controllers/memberController.js';

import validateGroupId from '../validator/validateGroupId.js';
import validateLoginCondition from '../validator/validateLoginCondition.js';
import validateLoginInfo from '../validator/validateLoginInfo.js';

const groupMemberRouters = express.Router();

groupMemberRouters.post(
  '/:groupId/members',
  validateLoginCondition,
  validateGroupId,
  createMember,
);
groupMemberRouters.get('/:groupId/members', validateGroupId, getMember);
groupMemberRouters.delete(
  '/:groupId/members',
  validateGroupId,
  validateLoginInfo,
  deleteMember,
);

export default groupMemberRouters;
