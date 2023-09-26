import jwt from "jsonwebtoken";
import CustomError from "../errors/custom_error";
import User, { user } from "../models/User.model";
import * as argon from "argon2";

export default {
  async sign(data: any) {
    return await jwt.sign(data, process.env.jwt_key as string, {
      expiresIn: "3d",
    });
  },

  async verify(token: string) {
    try {
      return await jwt.verify(token, process.env.jwt_key as string);
    } catch (error: any) {
      throw new CustomError("un-authorized", 409);
    }
  },
  async login(dto: user) {
    const user = await User.findOne({ email: dto.email });
  },
  async signup(dto: user) {
    try {
      const hash = await argon.hash(dto.password);
      const newUser: any = await User.create({
        email: dto.email,
        password: hash,
      });

      delete newUser.password;
      const token = await this.sign(newUser);
      return { token, ...newUser };
    } catch (error) {
      console.log(error);
    }
  },
};
