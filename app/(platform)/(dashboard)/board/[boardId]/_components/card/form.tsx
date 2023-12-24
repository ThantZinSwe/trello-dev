"use client";

import { createCard } from "@/actions/card/create";
import FormSubmitButton from "@/components/form/submit";
import FormTextarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import useAction from "@/hooks/useAction";
import { CardFormProps } from "@/interfaces/props/card";
import { error } from "console";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created!`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeydown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeydown);

    const onTextareaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      const { key, shiftKey, preventDefault } = event;

      if (key === "Enter" && !shiftKey) {
        preventDefault;
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const listId = formData.get("listId") as string;
      const title = formData.get("title") as string;
      const boardId = params.boardId as string;

      execute({
        listId,
        boardId,
        title,
      });
    };

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextarea
            id="title"
            onKeydown={onTextareaKeydown}
            ref={ref}
            errors={fieldErrors}
            placeholder="Enter a title for this card"
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmitButton>Add card</FormSubmitButton>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";

export default CardForm;
