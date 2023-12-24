"use client";

import { ListContainerProps } from "@/interfaces/props/list";
import ListForm from "./form";
import { useEffect, useState } from "react";
import ListItem from "./item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useAction from "@/hooks/useAction";
import { updateListOrder } from "@/actions/list/update/order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/card/update/order";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(lists);
  const { execute: updateListOrderExecute } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: updateCardOrderExecute } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderData(lists);
  }, [lists]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderData(items);
      updateListOrderExecute({ items, boardId });
    }

    if (type === "card") {
      let newOrderData = [...orderData];

      const sourceList = newOrderData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destList.cards) {
        destList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        ).map((card, index) => {
          card.order = index;
          return card;
        });

        sourceList.cards = reorderCards;

        setOrderData(newOrderData);
        updateCardOrderExecute({ items: reorderCards, boardId });
      } else {
        // remove card
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // change remove card's listId
        movedCard.listId = destination.droppableId;

        // add card
        destList.cards.splice(destination.index, 0, movedCard);

        // change order number
        sourceList.cards.map((card, index) => (card.order = index));
        destList.cards.map((card, index) => (card.order = index));

        setOrderData(newOrderData);
        updateCardOrderExecute({ items: destList.cards, boardId });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderData.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex shrink-0 w-1"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
