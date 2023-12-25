import { z } from "zod";

const UpdateCard = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z.optional(
    z
      .string({
        required_error: "The title field is required.",
        invalid_type_error: "The title field is required.",
      })
      .min(3, {
        message: "The title field has minimum length of 3 characters",
      })
  ),
  description: z.optional(
    z
      .string({
        required_error: "The description field is required.",
        invalid_type_error: "The description field is required.",
      })
      .min(3, {
        message: "The description field has minimum length of 3 characters",
      })
  ),
});

export default UpdateCard;
