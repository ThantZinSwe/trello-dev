"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCardModal from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import CardModalHeader from "./header";
import CardDescriptionModal from "./description";
import CardActionModal from "./actions";
import { AuditLog } from "@prisma/client";
import CardActivity from "./activity";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? (
          <CardModalHeader.Skeleton />
        ) : (
          <CardModalHeader card={cardData} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardDescriptionModal.Skeleton />
              ) : (
                <CardDescriptionModal card={cardData} />
              )}
              {!auditLogsData ? (
                <CardActivity.Skeleton />
              ) : (
                <CardActivity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <CardActionModal.Skeleton />
          ) : (
            <CardActionModal card={cardData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
