"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import useUserStore from "@/store/userStore";
import { CreditCardIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";
import LogoutButton from "./common/LogoutButton";

// Utility function to generate initials and color
const generateAvatarData = (name) => {
  if (!name) return { initials: "U", colorClass: "bg-gray-500" };

  // Extract initials
  const nameParts = name.trim().split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2); // Take only first 2 initials

  // Color mapping based on first letter of name
  const colorMap = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-teal-500",
    I: "bg-orange-500",
    J: "bg-cyan-500",
    K: "bg-lime-500",
    L: "bg-amber-500",
    M: "bg-emerald-500",
    N: "bg-violet-500",
    O: "bg-rose-500",
    P: "bg-primary",
    Q: "bg-green-600",
    R: "bg-red-600",
    S: "bg-purple-600",
    T: "bg-yellow-600",
    U: "bg-pink-600",
    V: "bg-indigo-600",
    W: "bg-teal-600",
    X: "bg-orange-600",
    Y: "bg-cyan-600",
    Z: "bg-lime-600",
  };

  const firstLetter = name.charAt(0).toUpperCase();
  const colorClass = colorMap[firstLetter] || "bg-gray-500";

  return { initials, colorClass };
};

const UserAvatar = memo(({ user, className }) => {
  const { initials, colorClass } = useMemo(
    () => generateAvatarData(user?.firstName),
    [user?.firstName]
  );

  return (
    <Avatar className={className}>
      <AvatarImage
        src={user?.organizationLogo || ""}
        className="object-cover"
        alt={user?.firstName || "User"}
        onError={(e) => {
          // Hide broken image and show fallback
          e.currentTarget.style.display = "none";
        }}
      />
      <AvatarFallback
        className={`rounded-lg text-white font-semibold ${colorClass}`}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
});

UserAvatar.displayName = "UserAvatar";

const UserInfo = memo(({ user }) => (
  <div className="grid flex-1 text-left text-sm leading-tight px-2">
    <span className="truncate font-medium">{user?.firstName || "User"}</span>
    <span className="text-xs text-muted-foreground truncate">
      {user?.email || "No email"}
    </span>
  </div>
));

UserInfo.displayName = "UserInfo";

// Skeleton components
const UserAvatarSkeleton = memo(({ className }) => (
  <Skeleton className={`${className} rounded-lg`} />
));

UserAvatarSkeleton.displayName = "UserAvatarSkeleton";

const UserInfoSkeleton = memo(() => (
  <div className="grid flex-1 text-left text-sm leading-tight px-2 space-y-1">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-3 w-32" />
  </div>
));

UserInfoSkeleton.displayName = "UserInfoSkeleton";

const NavUserSkeleton = memo(() => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" disabled className="cursor-default">
        <UserAvatarSkeleton className="h-8 w-8" />
        <UserInfoSkeleton />
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
));

NavUserSkeleton.displayName = "NavUserSkeleton";

export const NavUser = memo(({ dropdownSide = "right" }) => {
  const { isMobile } = useSidebar();
  const user = useUserStore((state) => state.user);

  const dropdownPosition = useMemo(
    () => ({
      side: isMobile ? "bottom" : dropdownSide,
      align: "end",
      sideOffset: 4,
    }),
    [isMobile, dropdownSide]
  );

  // Show skeleton when loading or no user data
  if (!user._id || !user.email) {
    return;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              aria-label="User menu"
            >
              <UserAvatar user={user} className="h-8 w-8 rounded-lg" />
              <UserInfo user={user} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            {...dropdownPosition}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar user={user} className="h-8 w-8 rounded-lg" />
                <UserInfo user={user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/accounts" className="pointer">
                    <UserCircleIcon className="mr-2 h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/accounts?tab=3">
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    Your Plans
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

NavUser.displayName = "NavUser";
