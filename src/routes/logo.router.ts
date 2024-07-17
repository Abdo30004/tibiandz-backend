import { Router } from 'express';

import { LogoController } from '../controllers/logo.controller';
import { validator } from '../middlewares/validator.middleware';
import { LogoValidator } from '../middlewares/validators/logo.validator';

export const routerConfig = {
  path: '/logo',
  router: Router()
} as const;

const { router } = routerConfig;

router
  .route('/')
  .get(LogoValidator.getAll, validator, LogoController.getAllLogos)
  .post(LogoValidator.create, validator, LogoController.createLogo);

router.route('/search').get(LogoValidator.search, validator, LogoController.searchLogo);
router.route('/autocomplete').get(LogoValidator.autocomplete, validator, LogoController.autoCompleteLogo);
router
  .route('/:id')
  .all(LogoValidator.byId, validator) //for all methods
  .get(LogoController.getLogoById)
  .put(LogoValidator.update, validator, LogoController.updateLogo)
  .delete(LogoController.deleteLogo);

router.route('/:id/approve').post(LogoValidator.byId, validator, LogoController.approveLogo);
router.route('/:id/reject').post(LogoValidator.byId, validator, LogoController.rejectLogo);
