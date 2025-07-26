"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { mutate } from "swr";

import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  FileText,
  PowerOff,
  Trash2,
  MoreVertical,
  Play,
} from "lucide-react";

import websiteApis from "../utils/websiteApis";
import DeleteModal from "@/components/common/DeleteModal";
import ActivationToggle from "@/components/common/ActivationToggle";

export function WebsiteCard({ website }) {
  const router = useRouter();

  return (
    <Card className="p-4 relative">
      <div className="absolute right-4 top-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Link href={`/websites/${website?._id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Details</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            {/* Activate / Deactivate toggle */}
            <ActivationToggle
              id={website?._id}
              title={`You're about to ${website?.isActive ? "deactivate" : "activate"} this site. Confirm your action.`}
              cacheKey={websiteApis.cacheKey}
              editRequest={websiteApis.update(website?._id)}
              currentStatus={website?.isActive}
              handleDone={async (updated) => {
                // Optional: update cache
                if (updated?.data) {
                  mutate(websiteApis.cacheKey, (prev = []) =>
                    prev.map((site) =>
                      site._id === website._id ? updated.data : site
                    ),
                    { revalidate: false }
                  );
                }
                router.refresh();
              }}
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                {website?.isActive ? (
                  <PowerOff className="mr-2 h-4 w-4" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                <span>{website?.isActive ? "Deactivate" : "Activate"}</span>
              </DropdownMenuItem>
            </ActivationToggle>

            <DropdownMenuSeparator />

            {/* Delete */}
            <DeleteModal
              id={website?._id}
              title={website?.name}
              cacheKey={websiteApis.cacheKey}
              deleteRequest={websiteApis.delete(website?._id)}
              handleDone={async () => {
                mutate(
                  websiteApis.cacheKey,
                  (prev = []) =>
                    prev.filter((site) => site._id !== website._id),
                  { revalidate: false }
                );
                router.refresh();
              }}
            >
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DeleteModal>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Card Content */}
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${website?.isActive ? "bg-secondary" : "bg-gray-400"}`}
          ></div>
          <span
            className={`text-sm ${website?.isActive ? "text-secondary" : "text-gray-400"} font-primary font-semibold`}
          >
            {website?.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <Link href={`/websites/${website?._id}`}>
        <h3 className="text-lg md:text-xl font-primary font-bold uppercase text-primary mb-2 hover:underline">
          {website?.name}
        </h3>
      </Link>

      <Link
        className="text-sm text-gray-500 mb-4 hover:underline transition-all duration-300 hover:text-secondary"
        href={website?.domain}
        target="_blank"
        rel="noopener noreferrer"
      >
        {website?.domain}
      </Link>
    </Card>
  );
}
