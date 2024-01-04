"use client";

import { CardDescriptionModalProps } from "@/interfaces/props/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlignLeft } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormTextarea from "@/components/form/textarea";
import FormSubmitButton from "@/components/form/submit";
import { Button } from "@/components/ui/button";
import useAction from "@/hooks/useAction";
import { updateCard } from "@/actions/card/update";
import { toast } from "sonner";

const CardDescriptionModal = ({ card }: CardDescriptionModalProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeydown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeydown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card ${data.title} updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: card.id,
      boardId,
      description,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              ref={textareaRef}
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description"
              defaultValue={card.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmitButton size="sm">Save</FormSubmitButton>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {card.description || "Add a more details description..."}
          </div>
        )}
      </div>
    </div>
  );
};

CardDescriptionModal.Skeleton = function CardDescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full mb-2 bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardDescriptionModal;
