import { z } from "zod";

const UpdateBoard = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: "The title field is required.",
      invalid_type_error: "The title field is required.",
    })
    .min(3, {
      message: "The title field has minimum length of 3 characters",
    }),
});

export default UpdateBoard;
