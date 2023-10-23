import jwt from "jsonwebtoken";
import CustomError from "../errors/custom_error";
import User, { user } from "../models/User.model";
import * as argon from "argon2";
import { omit } from "lodash";

export default {
  async sign(data: any) {
    return await jwt.sign(data, process.env.jwt_key as string, {
      expiresIn: "7d",
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
    if (!user) throw new CustomError("no user with this email", 404);
    const status = await argon.verify(user!.password, dto.password);
    if (status) {
      const token = await this.sign(omit(user!.toJSON(), "password"));
      return { token, ...omit(user!.toJSON(), "password") };
    } else {
      throw new CustomError("Incorrect credentials", 401);
    }
  },
  async signup(dto: user) {
    try {
      const hash = await argon.hash(dto.password);
      const newUser: any = await User.create({
        email: dto.email,
        password: hash,
      });

      delete newUser.password;
      const token = await this.sign(newUser.toJSON());
      return { token, ...omit(newUser!.toJSON(), "password") };
    } catch (error: any) {
      console.log(error);
      if (error.code == "11000") {
        throw new CustomError("user already exists", 409);
      } else {
        throw new CustomError(error.message, 500);
      }
    }
  },
};
