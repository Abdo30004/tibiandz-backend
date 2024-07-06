import { Router } from "express";
import { SuccessResponse } from "../utils/response";
import { LogoValidator } from "../validators/logo.validator";
import { validator } from "../middlewares/validator";
import { LogoController } from "../controllers/logo.controller";

export const routerConfig = {
  path: "/logo",
  router: Router(),
} as const;

const { router } = routerConfig;

router
  .route("/")
  .get()
  .post(LogoValidator.create, validator, LogoController.createLogo);

router
  .route("/:id")
  .all(LogoValidator.byId, validator)

  .get()
  .put()
  .delete();
