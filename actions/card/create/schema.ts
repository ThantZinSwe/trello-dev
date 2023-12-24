import { z } from "zod";

const CreateCard = z.object({
  boardId: z.string(),
  listId: z.string(),
  title: z
    .string({
      required_error: "The title field is required.",
      invalid_type_error: "The title field is required.",
    })
    .min(3, {
      message: "The title field has minimum length of 3 characters",
    }),
});

export default CreateCard;
