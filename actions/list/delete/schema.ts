import { z } from "zod";

const DeleteList = z.object({
  id: z.string(),
  boardId: z.string(),
});

export default DeleteList;
