import { body, param } from "express-validator";

export class LogoValidator {
  static byId = [param("id").isMongoId().withMessage("Invalid ID")];

  static submit = [
    body("name").isString().withMessage("Invalid name"),
    body("description").isString().withMessage("Invalid description"),
    body("email").isEmail().withMessage("Invalid email"),
    body("author").isString().withMessage("Invalid author"),
    body("fileId").isMongoId().withMessage("Invalid fileId"),
  ];

  static create = [
    ...LogoValidator.submit,
    body("label")
      .optional()
      .isIn(["new", "old", "none"])
      .withMessage("Invalid label"),
    body("tags").optional().isArray().withMessage("Invalid tags"),
    body("approved").isBoolean().withMessage("Invalid approved"),
  ];
}
