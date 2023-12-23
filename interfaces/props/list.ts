import { ListWithCards } from "@/types/types";
import { List } from "@prisma/client";

export interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

export interface ListItemProps {
  list: ListWithCards;
  index: number;
}

export interface ListHeaderProps {
  list: List;
}
