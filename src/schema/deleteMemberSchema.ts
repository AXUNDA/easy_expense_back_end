import { object, string } from "zod";

export const deleteMemberSchema = object({
  body: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});
