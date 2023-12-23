import { z } from "zod";

const CopyList = z.object({
  id: z.string(),
  boardId: z.string(),
});

export default CopyList;
