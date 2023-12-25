"use client";

import FormInput from "@/components/form/input";
import { CardHeaderModalProps } from "@/interfaces/props/card";
import { Layout } from "lucide-react";
import { useRef, useState, ElementRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useAction from "@/hooks/useAction";
import { updateCard } from "@/actions/card/update";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { error } from "console";

const CardModalHeader = ({ card }: CardHeaderModalProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>(card.title);
  const inputRef = useRef<ElementRef<"input">>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card ${data.title} updated.`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    const id = card.id as string;

    if (title === card.title) {
      return;
    }

    execute({ id, boardId, title });
  };

  return (
    <div className="flex items-start mb-6 gap-x-3 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            errors={fieldErrors}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{card.list.title}</span>
        </p>
      </div>
    </div>
  );
};

CardModalHeader.Skeleton = function CardModalHeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-netural-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardModalHeader;
