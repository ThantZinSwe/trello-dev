import { z } from "zod";

const DeleteCard = z.object({
  id: z.string(),
  boardId: z.string(),
});

export default DeleteCard;
