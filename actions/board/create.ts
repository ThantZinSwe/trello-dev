"use server";

import { db } from "@/lib/db";
import { BoardState } from "@/types/board";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "The title field has minimum length of 3 characters",
  }),
});

const create = async (prevState: BoardState, formData: FormData) => {
  const validateFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing field",
    };
  }

  const { title } = validateFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Database Error",
    };
  }

  revalidatePath("/organization/org_2YznBmnhd7LjatUbqakqBwh1Xjn");
  redirect("/organization/org_2YznBmnhd7LjatUbqakqBwh1Xjn");
};

export default create;
