import { Router } from 'express';

import { LogoController } from '../controllers/logo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
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
  .post(authMiddleware, LogoValidator.create, validator, LogoController.createLogo); //require admin

router.route('/new').get(LogoValidator.pagination, validator, LogoController.getNewLogos);
router.route('/submit').post(LogoValidator.submit, validator, LogoController.submitLogo);
router.route('/search').get(LogoValidator.search, validator, LogoController.searchLogo);
router.route('/autocomplete').get(LogoValidator.autocomplete, validator, LogoController.autoCompleteLogo);

router.route('/pending').get(authMiddleware, LogoValidator.pagination, validator, LogoController.getPendingLogos); //require admin

router
  .route('/:id')
  .get(LogoValidator.byId, validator, LogoController.getLogoById)
  .all(authMiddleware) //require admin
  .put(LogoValidator.update, validator, LogoController.updateLogo) //require admin
  .delete(LogoController.deleteLogo); //require admin

router.route('/:id/approve').put(authMiddleware, LogoValidator.byId, validator, LogoController.approveLogo); //require admin
router.route('/:id/reject').put(authMiddleware, LogoValidator.byId, validator, LogoController.rejectLogo); //require admin
