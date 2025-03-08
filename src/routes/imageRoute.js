import express from 'express';
import { upload, imageUpload } from '../controllers/imagesController.js';

const imageRoute = express.Router();

// 이미지 업로드 API 라우트 설정
imageRoute.post('/images', upload.array('image'), imageUpload);

export default imageRoute;
