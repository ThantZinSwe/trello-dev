import { ACTION, ENTITY_TYPE } from "@prisma/client";

export interface EntityProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}
