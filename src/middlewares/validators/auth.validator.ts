import { body } from 'express-validator';

export class AuthValidator {
  static login = [
    body('email').isEmail().notEmpty().withMessage('Invalid email'),
    body('password').isString().notEmpty().withMessage('Invalid password')
  ];
}
