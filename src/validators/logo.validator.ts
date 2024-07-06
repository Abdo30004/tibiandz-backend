import { param } from "express-validator";

export class LogoValidator {
    static byId = [param("id").isMongoId().withMessage("Invalid ID")];
    static create = [
        param("name").isString().withMessage("Invalid name"),
        param("fileId").isString().withMessage("Invalid file"),
    ];



}
