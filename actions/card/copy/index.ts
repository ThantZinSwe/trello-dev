"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import CopyCard from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    const copyToCard = await db.card.findUnique({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId,
          },
        },
      },
    });

    if (!copyToCard) {
      return {
        error: "Card not found!",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: copyToCard.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        listId: copyToCard.listId,
        title: `${copyToCard.title} - Copy`,
        order: newOrder,
        description: copyToCard.description,
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
