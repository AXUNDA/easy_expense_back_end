import { Schema, model } from "mongoose";

interface member {
  email: string;
}

const MemberSchema = new Schema<member>(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Member = model<member>("Member", MemberSchema);

export default Member;
export { member };
