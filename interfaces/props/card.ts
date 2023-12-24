import { Card } from "@prisma/client";

export interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export interface CardItemProps {
  index: number;
  card: Card;
}
