"use client";

import { copyList } from "@/actions/list/copy";
import { deleteList } from "@/actions/list/delete";
import FormSubmitButton from "@/components/form/submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useAction from "@/hooks/useAction";
import { ListOptionsProps } from "@/interfaces/props/list";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: copyExecute } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    copyExecute({ id, boardId });
  };

  const { execute: deleteExecute } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    deleteExecute({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            ref={closeRef}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
          onClick={onAddCard}
        >
          Add card
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmitButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list
          </FormSubmitButton>
        </form>

        <Separator />

        <form action={onDelete}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmitButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
