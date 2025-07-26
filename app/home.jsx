"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import dashboardRootApis from "./_pages/DashboardRoot/utils/apis";
import DashboardRoot from "./_pages/DashboardRoot/DashboardRoot";
import useSWR from "swr";
import { fetchApi } from "@/utils/apiMaker";



export default function Home() {
  const { data } = useSWR(
    dashboardRootApis.cacheKey,
    fetchApi({ endpoint: "/profiles", path: "/user/me", method: "GET" })

  );


  return (
    <>
      <SidebarProvider>
        <AppSidebar
          userData={data?.data}
          variant="inset"
        />
        <SidebarInset>
          <SiteHeader userData={data?.data} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 sm:px-6 lg:px-8">
                <DashboardRoot />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
