"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const destroy = async (id: string) => {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2YznBmnhd7LjatUbqakqBwh1Xjn");
};

export default destroy;
