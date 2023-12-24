"use client";

import { ListItemProps } from "@/interfaces/props/list";
import ListHeader from "./header";
import { ElementRef, useRef, useState } from "react";
import CardForm from "../card/form";
import { cn } from "@/lib/utils";
import CardItem from "../card/item";

const ListItem = ({ list, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader list={list} onAddCard={enableEditing} />
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            list.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {list.cards.map((card) => (
            <CardItem index={index} key={card.id} card={card} />
          ))}
        </ol>
        <CardForm
          listId={list.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
