import multer from 'multer';
import path from 'path';

// 이미지 파일 저장소 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 'uploads' 폴더에 파일 저장
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일명을 고유하게 설정
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // 파일이 허용된 타입이면 업로드 진행
  } else {
    cb(
      new Error('Invalid file type. Only JPG, PNG, and GIF are allowed'),
      false,
    );
  }
};

// multer 설정 (파일 저장소, 필터, 제한 크기 등)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 파일 크기 제한 (10MB)
});

// 업로드된 파일 경로를 응답으로 반환하는 함수
const imageUpload = (req, res) => {
  if (req.files) {
    // 업로드된 파일 경로를 배열로 반환
    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    return res.status(200).json({ paths: filePaths });
  }
  res.status(400).send({ message: 'No files uploaded' });
};

export { upload, imageUpload };
