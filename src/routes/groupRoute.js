import express from 'express';
import { createGroup } from '../services/groupService.js';

const router = express.Router();

router.post('/group', async (req, res) => {
  try {
    const group = await createGroup(req.body);
    res.status(201).send(group);
  } catch (e) {
    const status = e.status || 500;
    return res.status(status).send({ message: e.message });
  }
});

export default router;
