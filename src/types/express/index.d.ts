import type { Admin } from '../database';

export {};
declare global {
  namespace Express {
    export interface Request {
      user: Admin;
    }
  }
}
