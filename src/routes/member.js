import express from 'express';
import {
  createMember,
  deleteMember,
  getMember,
} from '../controllers/memberController.js';

import validateGroupId from '../lib/validator/validateGroupId.js';
import validateLoginCondition from '../lib/validator/validateLoginCondition.js';
import validateLoginInfo from '../lib/validator/validateLoginInfo.js';

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
