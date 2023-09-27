import { object, string } from "zod";

export const createMemberSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("a valid email is required"),
  }),
});
