import { Router } from 'express';

import { FileController } from '../controllers/file.controller';
import { upload } from '../middlewares/upload.middleware';

export const routerConfig = {
  path: '/file',
  router: Router()
} as const;

const { router } = routerConfig;

router.post('/upload', upload.single('logo'), FileController.upload);
