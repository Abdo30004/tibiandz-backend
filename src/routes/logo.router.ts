import { Router } from 'express';

import { LogoController } from '../controllers/logo.controller';
import { validator } from '../middlewares/validator.middleware';
import { LogoValidator } from '../middlewares/validators/logo.validator';

export const routerConfig = {
  path: '/logo',
  router: Router()
} as const;

const { router } = routerConfig;

router.route('/').get().post(LogoValidator.create, validator, LogoController.createLogo);

router
  .route('/:id')
  .all(LogoValidator.byId, validator)

  .get()
  .put()
  .delete();
