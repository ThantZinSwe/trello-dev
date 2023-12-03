"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NavItemProps } from "@/interfaces/props/nav-items";
import { cn } from "@/lib/utils";
import subOrganizationRoutes from "@/routes/sub-organization-routes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NavItem = ({
  organization,
  isActive,
  isExpanded,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = subOrganizationRoutes(organization.id);

  const onClick = (href: string) => {
    return router.push(href);
  };

  return (
    <>
      <AccordionItem value={organization.id} className="border-none">
        <AccordionTrigger
          onClick={() => onExpand(organization.id)}
          className={cn(
            "flex items-center gap-x-2 p-1.5 text-netural-700 rounded-md hover:bg-netural-500/10 transition text-start no-underline hover:no-underline",
            isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
          )}
        >
          <div className="flex items-center gap-x-2">
            <div className="w-7 h-7 relative">
              <Image
                fill
                src={organization.imageUrl}
                alt="Organization"
                className="rounded-sm object-cover"
              />
            </div>
            <span className="font-medium text-sm">{organization.name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-netural-700">
          {routes.map((route) => (
            <Button
              key={route.label}
              onClick={() => onClick(route.href)}
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === route.href && "bg-sky-500/10 text-sky-700"
              )}
              variant="ghost"
            >
              {route.icon}
              <span className="ml-3">{route.label}</span>
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default NavItem;

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
