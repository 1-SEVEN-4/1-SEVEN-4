import { groupService } from '../src/controllers/groupController.js';
import prisma from '../src/config/prisma.js';

jest.mock('../src/config/prisma.js');

describe('그룹 API tests', () => {
  afterEach(() => {
    jest.clearAllMocks;
  });
});
