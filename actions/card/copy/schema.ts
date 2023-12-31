import { z } from "zod";

const CopyCard = z.object({
  id: z.string(),
  boardId: z.string(),
});

export default CopyCard;
