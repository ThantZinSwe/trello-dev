"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardActionsModalProps } from "@/interfaces/props/card";
import { Copy, Trash } from "lucide-react";

const CardActionModal = ({ card }: CardActionsModalProps) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button variant="gray" size="inline" className="w-full justify-start">
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button variant="gray" size="inline" className="w-full justify-start">
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
