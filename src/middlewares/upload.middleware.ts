import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
/**
 * @description Middleware to upload files
 */
export const upload = multer({
  storage
});
