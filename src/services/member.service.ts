import Member, { member } from "../models/Member.model";
import CustomError from "../errors/custom_error";

export default {
  async addMember(dto: member) {
    try {
      const newMember = await Member.create({
        email: dto.email,
      });
      return newMember;
    } catch (error: any) {
      if (error.code == "E11000") {
        throw new CustomError("member already exists", 409);
      } else {
        throw new CustomError(error.message, 500);
      }
    }
  },
  async removeMember(dto: string) {
    try {
      await Member.findByIdAndDelete(dto);
      return;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  },
  async getallMembers() {
    try {
      return await Member.find({});
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  },
};
