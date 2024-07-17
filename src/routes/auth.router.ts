import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { validator } from '../middlewares/validator.middleware';
import { AuthValidator } from '../middlewares/validators/auth.validator';

export const routerConfig = {
  path: '/auth',
  router: Router()
} as const;

const { router } = routerConfig;

router.post('/login', AuthValidator.login, validator, AuthController.login); // /auth/login
