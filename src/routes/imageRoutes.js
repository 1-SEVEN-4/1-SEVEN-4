import express from 'express';
import { catchHandler } from '../lib/catchHandler.js';
import { upload, imageUpload } from '../utils/imageUtil.js';

const imageRoute = express.Router();

imageRoute.post(
  '/images',
  upload.array('photo', 10),
  catchHandler(imageUpload),
);

export default imageRoute;
