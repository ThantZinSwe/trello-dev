"use client";

import { copyCard } from "@/actions/card/copy";
import { deleteCard } from "@/actions/card/delete";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAction from "@/hooks/useAction";
import useCardModal from "@/hooks/useCardModal";
import { CardActionsModalProps } from "@/interfaces/props/card";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const CardActionModal = ({ card }: CardActionsModalProps) => {
  const cardModal = useCardModal();
  const params = useParams();

  const { execute: copyCardExecute, isLoading: copyCardLoading } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: deleteCardExecute, isLoading: deleteCardLoading } =
    useAction(deleteCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const onCopyCard = () => {
    const boardId = params.boardId as string;

    copyCardExecute({
      id: card.id,
      boardId,
    });
  };

  const onDeleteCard = () => {
    const boardId = params.boardId as string;

    deleteCardExecute({
      id: card.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopyCard}
        disabled={copyCardLoading}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDeleteCard}
        disabled={deleteCardLoading}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

CardActionModal.Skeleton = function CardActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

export default CardActionModal;
