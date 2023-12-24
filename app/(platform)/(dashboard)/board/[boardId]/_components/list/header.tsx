"use client";

import { updateList } from "@/actions/list/update";
import FormInput from "@/components/form/input";
import useAction from "@/hooks/useAction";
import { ListHeaderProps } from "@/interfaces/props/list";
import { ElementRef, KeyboardEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./options";

const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(list.title);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Rename to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const title = formData.get("title") as string;

    if (title === list.title) {
      disableEditing();
    }

    execute({
      id,
      boardId,
      title,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" defaultValue={list.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={list.boardId}
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title"
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {list.title}
        </div>
      )}
      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  );
};

export default ListHeader;
