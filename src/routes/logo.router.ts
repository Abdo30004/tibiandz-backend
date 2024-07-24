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
  .get(LogoValidator.pagination, validator, LogoController.getAllLogos)
  .post(LogoValidator.create, validator, LogoController.createLogo); //require admin

router.route('/new').get(LogoValidator.pagination, validator, LogoController.getNewLogos);
router.route('/submit').post(LogoValidator.submit, validator, LogoController.submitLogo);
router.route('/search').get(LogoValidator.search, validator, LogoController.searchLogo);
router.route('/autocomplete').get(LogoValidator.autocomplete, validator, LogoController.autoCompleteLogo);

router.route('/pending').get(LogoValidator.pagination, validator, LogoController.getPendingLogos); //require admin

router
  .route('/:id')
  .all(LogoValidator.byId, validator) //for all methods
  .get(LogoController.getLogoById)
  .put(LogoValidator.update, validator, LogoController.updateLogo) //require admin
  .delete(LogoController.deleteLogo); //require admin

router.route('/:id/approve').post(LogoValidator.byId, validator, LogoController.approveLogo); //require admin
router.route('/:id/reject').post(LogoValidator.byId, validator, LogoController.rejectLogo); //require admin
