import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
