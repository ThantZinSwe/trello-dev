import { BoardIdProps } from "@/interfaces/props/board";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ListContainer from "./_components/list/container";

const BoardPage = async ({ params }: BoardIdProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="h-full p-4 overflow-x-auto">
      <ListContainer lists={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardPage;
