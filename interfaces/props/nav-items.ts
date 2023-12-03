import { Organization } from "@/types/organization";

export interface NavItemProps {
  organization: Organization;
  isActive: boolean;
  isExpanded: string;
  onExpand: (id: string) => void;
}
