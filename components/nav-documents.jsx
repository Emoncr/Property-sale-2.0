"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo } from "react";

export function NavDocuments({ items, openMenuKey, setOpenMenuKey }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const matched = useMemo(() => {
    return (
      items.find((item) =>
        item.submenu?.some(
          (sub) =>
            sub.url === pathname ||
            (sub.tab && pathname === item.url && `${sub.tab}` === currentTab)
        )
      ) ||
      items.find((item) => pathname === item.url) ||
      null
    );
  }, [pathname, currentTab, items]);

  useEffect(() => {
    if (matched) {
      setOpenMenuKey(matched.name || matched.title);
    } else {
      setOpenMenuKey(null);
    }
  }, [matched, setOpenMenuKey]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Separator />
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          const isOpen = openMenuKey === item.name;

          if (item.submenu?.length > 0) {
            return (
              <Collapsible
                key={item.name}
                asChild
                open={isOpen}
                onOpenChange={(isOpen) => {
                  setOpenMenuKey(isOpen ? item.name : null);
                }}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        tooltip={item.name}
                        className={`py-5 text-sm lg:text-base font-primary font-semibold mt-2
    ${isActive ? "font-bold bg-primary text-white hover:bg-primary hover:text-white cursor-default"
                            : "hover:bg-muted hover:text-foreground"}
  `}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.name}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>

                    </Link>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="max-h-36 overflow-y-auto scroll-smooth scrollbar-hide">
                      <SidebarMenuSub>
                        {item.submenu.map((subItem) => {
                          const isSubActive =
                            (subItem.url && pathname === subItem.url) ||
                            (subItem.tab && pathname === item.url && `${subItem.tab}` === currentTab);
                          const link = subItem.url
                            ? subItem.url
                            : `${item.url}?tab=${subItem.tab}`;
                          return (
                            <SidebarMenuSubItem key={subItem.title} className="mt-2">
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={link}
                                  className={isSubActive ? "!bg-primary !text-white" : ""}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </div>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                className={`text-base xl:mt-2 flex items-center ${isActive ? "!bg-primary !text-white" : ""}`}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
