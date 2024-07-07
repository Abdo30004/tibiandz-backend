import { body } from 'express-validator';

export class AuthValidator {
  static login = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isString().withMessage('Invalid password')
  ];
}
