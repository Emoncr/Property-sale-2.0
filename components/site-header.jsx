import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavUserLoading } from "./common/NavUserLoading";

export function SiteHeader({ userData, isLoading }) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear pb-1 pr-1">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div>
        {isLoading ? (
          <NavUserLoading />
        ) : (
          <NavUser dropdownSide="bottom" user={userData} />
        )}
      </div>
    </header>
  );
}
