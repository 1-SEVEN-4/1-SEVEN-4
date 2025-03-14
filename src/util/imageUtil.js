import multer from 'multer';
import path from 'path';
import BadRequestError from '../lib/BadRequestError.js';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedTypes.includes(file.mimetype)) {
    const err = new BadRequestError('이미지 파일을 업로드 바랍니다.');
    return cb(err);
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

const imageUpload = (req, res) => {
  if (req.files) {
    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    return res.status(200).json({ urls: filePaths });
  }
  res.status(400).send({ message: '업로드 된 파일이 없습니다.' });
};

export { upload, imageUpload };
