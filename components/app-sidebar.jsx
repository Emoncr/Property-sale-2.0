"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import SidebarLoading from "./common/SidebarLoading";
import { NavUserLoading } from "./common/NavUserLoading";
import useUserStore from "@/store/userStore";
import { MdCampaign } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import useSWR from "swr";
import websiteApis from "@/app/_pages/Websites/utils/websiteApis";
import campaignApis from "@/app/_pages/Websites/utils/campaignApis";
import {
  Bell,
  Cable,
  Globe,
  LayoutDashboardIcon,
  ListVideo,
  Unplug,
  UserCog,
} from "lucide-react";

const staticData = {
  user: {
    name: "Emon",
    email: "biplobemon@me.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Websites",
      url: "/websites",
      icon: Globe,
      submenu: [
        {
          title: "All Website",
          url: "/websites",
        },
      ],
    },
    {
      title: "Campaigns",
      url: "#",
      icon: MdCampaign,
      submenu: [],
    },
    {
      title: "Donations",
      url: "/donations",
      icon: BiSolidDonateHeart,
      submenu: [
        {
          title: "Onetime Donations",
          url: "/donations?donationType=one-time",
        },
        {
          title: "Recurring Donations",
          url: "/donations?donationType=recurring",
        },
      ],
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Cable,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Api Resources",
      url: "/api-resources",
      icon: Unplug,
    },
  ],
  donorDashboardItems: [
    {
      title: "Dashboard",
      url: "/donor-dashboard",
      icon: LayoutDashboardIcon,
    },
  ],
  documents: [
    {
      name: "Accounts",
      url: "/accounts",
      icon: UserCog,
      submenu: [
        {
          title: "Account",
          tab: 1,
        },
        {
          title: "User Info",
          tab: 2,
        },
        {
          title: "Plan",
          tab: 3,
        },
      ],
    },
    {
      name: "Tutorials",
      url: "/tutorials",
      icon: ListVideo,
    },
  ],
};
// Normalize fetchers to return only `items` array (or empty array)
const extractItemsFetcher =
  (apiFunc) =>
    async (...args) => {
      const res = await apiFunc(...args);
      return res?.data?.items || [];
    };
export function AppSidebar({ userData, ...props }) {


  const [openMenuKey, setOpenMenuKey] = useState("/"); // manage the open menu state universally

  const [sidebarData, setSidebarData] = useState({
    navMain: [...staticData.navMain],
    donorDashboardItems: [...staticData.donorDashboardItems],
    documents: [...staticData.documents],
  }); // use a state to store the sidebar data and make dynamic changes

  // Fetch websites and campaigns, both normalized to items array
  const { data: websiteData, isLoading: websiteLoading } = useSWR(
    websiteApis.cacheKey,
    extractItemsFetcher(websiteApis.list)
  );
  const { data: campaignData, isLoading: campaignLoading } = useSWR(
    campaignApis.cacheKey,
    extractItemsFetcher(campaignApis.getAll)
  );

  // Update sidebar menus when data changes
  useEffect(() => {
    if (!Array.isArray(websiteData) || !Array.isArray(campaignData)) return;
    setSidebarData((prev) => {
      const navMainCopy = [...prev.navMain];
      const websitesIndex = navMainCopy.findIndex(
        (item) => item.title === "Websites"
      );
      if (websitesIndex !== -1) {
        navMainCopy[websitesIndex] = {
          ...navMainCopy[websitesIndex],
          submenu: [
            { title: "All Website", url: "/websites" },
            ...websiteData.map((site) => ({
              title: site.name || "Website",
              url: `/websites/${site._id}`,
            })),
          ],
        };
      }
      // Update Campaigns submenu
      const campaignsIndex = navMainCopy.findIndex(
        (item) => item.title === "Campaigns"
      );
      if (campaignsIndex !== -1) {
        navMainCopy[campaignsIndex] = {
          ...navMainCopy[campaignsIndex],
          submenu: campaignData.map((camp) => ({
            title: camp.name || "Campaign",
            url: `/campaign/${camp._id}`,
          })),
        };
      }
      return {
        ...prev,
        navMain: navMainCopy,
      };
    });
  }, [websiteData, campaignData]);
  // Update user in global store
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);



  const isLoading = websiteLoading || campaignLoading;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={200}
                  height={60}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <SidebarLoading />
        ) : (
          <>
            <NavMain
              items={sidebarData?.navMain}
              setOpenMenuKey={setOpenMenuKey}
              openMenuKey={openMenuKey}
            />
            <NavDocuments
              setOpenMenuKey={setOpenMenuKey}
              openMenuKey={openMenuKey}
              items={sidebarData.documents}
            />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? <NavUserLoading /> : <NavUser userData={userData} />}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
