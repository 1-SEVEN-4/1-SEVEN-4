import express from 'express';
import { getGroupTags, getGroupTagsDetail } from '../controllers/groupTagController.js';

const tagRoute = express();

tagRoute.get('/', getGroupTags);
tagRoute.get('/:tagId', getGroupTagsDetail);

export default tagRoute;
