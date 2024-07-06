import { Router } from "express";
import { upload } from "../middlewares/fileUpload";
import { SuccessResponse } from "../utils/response";
import { FileController } from "../controllers/file.controller";

export const routerConfig = {
  path: "/file",
  router: Router(),
} as const;

const { router } = routerConfig;

router.post("/upload", upload.single("logo"), FileController.upload);
