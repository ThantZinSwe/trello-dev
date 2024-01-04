import { AuditLog } from "@prisma/client";

export interface CardActivityProps {
  items: AuditLog[];
}
