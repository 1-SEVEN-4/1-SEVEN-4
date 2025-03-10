import multer from 'multer';
import path from 'path';
import BadRequestError from '../lib/BadRequestError.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedTypes.includes(file.mimetype)) {
    const err = new BadRequestError('이미지 파일을 업로드해주세요.');
    return cb(err);
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const imageUpload = (req, res) => {
  if (req.files) {
    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    return res.status(200).json({ urls: filePaths });
  }
  res.status(400).send({ message: '업로드된 파일이 없습니다.' });
};

export { upload, imageUpload };
