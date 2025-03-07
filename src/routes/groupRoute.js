import express from 'express';
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from '../services/groupService.js';
import e from 'express';

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

router.put('/group/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { updateData } = req.body;
    const updateGroup = await updateGroup(groupId, updateData);

    return res.status(200).send(updateGroup);
  } catch (e) {
    return res.status(e.status || 500).send({ message: e.message });
  }
});

router.delete('/group/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { ownerPassword } = req.body;

    const deleteGroup = await deleteGroup(groupId, ownerPassword);
    return res.status(200);
  } catch (e) {
    return res.status(e.status || 500).send({ message: e.message });
  }
});

export default router;
