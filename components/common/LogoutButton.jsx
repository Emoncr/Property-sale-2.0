"use client";

import useUserStore from "@/store/userStore";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your preferred toast library
import { SignOutButton } from "@clerk/nextjs";

const LogoutButton = () => {
  const router = useRouter();
  const { removeUser } = useUserStore();

  const handleLogout = () => {
    removeUser();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <SignOutButton>
      <DropdownMenuItem onClick={handleLogout}>
        <LogOutIcon className="mr-2 h-4 w-4" />
        <span>{"Logout"}</span>
      </DropdownMenuItem>
    </SignOutButton>
  );
};

export default LogoutButton;
