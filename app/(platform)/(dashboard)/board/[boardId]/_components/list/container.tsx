"use client";

import { ListContainerProps } from "@/interfaces/props/list";
import ListForm from "./form";
import { useEffect, useState } from "react";
import ListItem from "./item";

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(lists);

  useEffect(() => {
    setOrderData(lists);
  }, [lists, orderData]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderData.map((list, index) => (
        <ListItem key={list.id} index={index} list={list} />
      ))}
      <ListForm />
      <div className="flex shrink-0 w-1"></div>
    </ol>
  );
};

export default ListContainer;
