import React from "react";
import {
  MoreVertical,
  Edit,
  Power,
  Bell,
  CheckCircle,
  BarChart2,
  Flag,
  Gift,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const NotificationCards = () => {
  return (
    <div className="space-y-6 font-primary">
      {/* Contribution Confirmation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Contribution Confirmation
              </h3>
              <p className="text-sm text-gray-500">
                Receive confirmation when your donation is processed
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <Link href={"/notifications/contribution-confirmation"}>
                <DropdownMenuItem className="flex items-center gap-2 text-sm px-4 py-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-2 text-sm px-4 py-2">
                <Power className="h-4 w-4" />
                Turn Off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Contribution Status */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Contribution Status
              </h3>
              <p className="text-sm text-gray-500">
                Get updates about your donation status
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <Link href={"/notifications/contribution-status"}>
                <DropdownMenuItem className="flex items-center gap-2 text-sm px-4 py-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-2 text-sm px-4 py-2">
                <Power className="h-4 w-4" />
                Turn Off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NotificationCards;
