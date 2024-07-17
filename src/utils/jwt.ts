import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class JwtUtil {
  private static secret = process.env.JWT_SECRET;
  private static expiresIn = process.env.JWT_EXPIRES_IN;

  static generateToken(id: string) {
    return jwt.sign({ id }, this.secret, { expiresIn: this.expiresIn });
  }

  static verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload as { id: string };
    } catch (error) {
      return null;
    }
  }
}
