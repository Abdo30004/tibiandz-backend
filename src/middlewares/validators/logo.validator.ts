import { body, param, query } from 'express-validator';

export class LogoValidator {
  static byId = [param('id').isMongoId().withMessage('Invalid ID')];
  static getAll = [
    query('page')
      .optional()
      .isInt({
        min: 1
      })
      .withMessage('Invalid page number'),
    query('limit')
      .optional()
      .isInt({
        min: 1
      })
      .withMessage('Invalid limit number')
  ];

  static submit = [
    body('name').isString().notEmpty().withMessage('Invalid name'),
    body('description').isString().notEmpty().withMessage('Invalid description'),
    body('email').isEmail().notEmpty().withMessage('Invalid email'),
    body('author').isString().notEmpty().withMessage('Invalid author'),
    body('fileId').isMongoId().notEmpty().withMessage('Invalid fileId')
  ];

  static create = [
    ...LogoValidator.submit,
    body('label').optional().isIn(['new', 'old', 'none']).withMessage('Invalid label'),
    body('tags').optional().isArray().withMessage('Invalid tags'),
    body('approved').isBoolean().withMessage('Invalid approved')
  ];

  static update = [...LogoValidator.byId, ...LogoValidator.submit.map(validator => validator.optional())];

  static autocomplete = [query('q').isString().notEmpty().withMessage('Invalid search query')];

  static search = [...LogoValidator.autocomplete, ...LogoValidator.getAll];
}
