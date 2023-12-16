import { z } from "zod";

const CreateBoard = z.object({
  title: z
    .string({
      required_error: "The title field is required.",
      invalid_type_error: "The title field is required.",
    })
    .min(3, {
      message: "The title field has minimum length of 3 characters",
    }),
  image: z.string({
    required_error: "The image field is required.",
    invalid_type_error: "The image field is required.",
  }),
});

export default CreateBoard;
