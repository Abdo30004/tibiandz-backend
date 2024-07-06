import { AdminModel } from "../database/models/admin";
import { HashUtil } from "../utils/hash";
import { JwtUtil } from "../utils/jwt";

export class AuthService {
  static async login(email: string, password: string) {
    const admin = await AdminModel.findOne({ email }).catch((err) => null);

    if (!admin) {
      return null;
    }

    const passwordMatch = await HashUtil.compare(password, admin.password);

    if (!passwordMatch) {
      return null;
    }

    const token = JwtUtil.generateToken(admin._id.toString());

    return token;
  }
}
