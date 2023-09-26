import { Schema, model } from "mongoose";

interface user {
  email: string;
  password: string;
}

const UserSchema = new Schema<user>(
  {
    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<user>("User", UserSchema);

export default User;
export { user };
