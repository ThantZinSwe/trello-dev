"use client";

import { updateBoard } from "@/actions/board/update";
import FormInput from "@/components/form/input";
import { Button } from "@/components/ui/button";
import useAction from "@/hooks/useAction";
import { BoardTitleFormProps } from "@/interfaces/props/board/title-form";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [title, setTitle] = useState<string>(board.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      disabledEditing();
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enabledEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === board.title) {
      disabledEditing();

      return;
    }

    execute({
      id: board.id,
      title,
    });
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enabledEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
    >
      {board.title}
    </Button>
  );
};

export default BoardTitleForm;
