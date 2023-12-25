import { CardWithList } from "@/types/types";
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

export interface CardHeaderModalProps {
  card: CardWithList;
}

export interface CardDescriptionModalProps {
  card: CardWithList;
}

export interface CardActionsModalProps {
  card: CardWithList;
}
