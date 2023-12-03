import { Activity, CreditCard, Layout, Settings } from "lucide-react";

const subOrganizationRoutes = (organizationId: string) => {
  return [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4 mr-3" />,
      href: `/organization/${organizationId}`,
    },
    {
      label: "Activity",
      icon: <Activity className="w-4 h-4 mr-3" />,
      href: `/organization/${organizationId}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-3" />,
      href: `/organization/${organizationId}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4 mr-3" />,
      href: `/organization/${organizationId}/billing`,
    },
  ];
};

export default subOrganizationRoutes;
