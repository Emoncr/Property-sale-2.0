"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

export function NavMain({ items, openMenuKey, setOpenMenuKey }) {
  const currentPath = usePathname();

  useEffect(() => {
    const matched = items.find((item) =>
      item.submenu?.some((sub) => currentPath.startsWith(sub.url))
    );

    if (matched) {
      setOpenMenuKey(matched.title);
    } else {
      const directMatch = items.find((item) => item.url === currentPath);
      if (directMatch) {
        setOpenMenuKey(directMatch.title);
      } else {
        setOpenMenuKey(null);
      }
    }
  }, [currentPath, items, setOpenMenuKey]);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="mt-4">
          {items.map((item) => (
            <>
              {item.submenu && item.submenu.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  open={openMenuKey === item.title}
                  onOpenChange={(isOpen) => {
                    setOpenMenuKey(isOpen ? item.title : null);
                  }}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      {item.title === "Campaigns" ? (
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${openMenuKey === item.title || (item.url === currentPath && currentPath !== "/")
                            ? "!bg-primary !text-white"
                            : ""
                            } py-5 text-sm lg:text-base font-primary font-semibold mt-2`}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      ) : (
                        <Link href={item.url}>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={`${openMenuKey === item.title || (item.url === currentPath && currentPath !== "/")
                              ? "!bg-primary !text-white"
                              : ""
                              } py-5 text-sm lg:text-base font-primary font-semibold mt-2`}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </Link>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="group relative">
                        <div className="max-h-36 overflow-y-hidden group-hover:overflow-y-auto scroll-smooth scrollbar-default">             
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              className="mt-2"
                            >
                              <SidebarMenuSubButton asChild className="p-4">
                                <Link
                                  href={subItem.url}
                                  className={
                                    subItem.url === currentPath
                                      ? "!bg-primary !text-white"
                                      : ""
                                  }
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </div>
                      </div>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <Link
                    href={item.url}
                    className={`text-base xl:mt-2 flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white ${item.url === "/"
                      ? currentPath === item.url
                        ? "!bg-primary !text-white"
                        : ""
                      : currentPath.startsWith(item.url)
                        ? "!bg-primary !text-white"
                        : ""
                      }`}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              )}
            </>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
