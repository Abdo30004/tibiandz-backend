import { Router } from "express";
import { upload } from "../middlewares/fileUpload";
import { SuccessResponse } from "../utils/response";

export const routerConfig = {
  path: "/file",
  router: Router(),
} as const;

const { router } = routerConfig;

router.post("/upload", upload.single("logo"), (req, res) => {
  const successResponse = new SuccessResponse({
    message: "File uploaded successfully",
    data: req.file,
  });

  res.json(successResponse);
  
});
