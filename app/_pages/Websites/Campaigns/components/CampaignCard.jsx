"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical, BsCalendar } from "react-icons/bs";
import moment from "moment";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CampaignOptionModal from "./CampaignOptionModal";

const CampaignCard = ({ campaign, websiteId }) => {
  return (
    <div
      className={`sm:max-w-[388px] w-full py-5 px-4 rounded-[10px] shadow-[0px_2px_12px_0px_#0000001F] bg-white ${!campaign?.isActive && "!bg-[#d3d3d3]/80 !shadow-none"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-black-50 line-clamp-1 font-primary capitalize">
          {campaign?.name}
        </h2>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="z-20 relative">
                <BsThreeDotsVertical className="text-gray-500 text-2xl" />
              </button>
            </DropdownMenuTrigger>
            <CampaignOptionModal
              websiteId={websiteId}
              campaignId={campaign?._id}
              onClose={() => { }}
              campaign={campaign}
            />
          </DropdownMenu>
        </div>
      </div>

      {/* Rest of the card content remains the same */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="px-3 py-2 rounded-[10px] bg-[#F4F8FB] flex items-center justify-start gap-3">
          <div>
            <Image
              src="/icons/goal image.png"
              alt="Icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <p className="text-[#616161] font-medium text-sm font-primary">
              Campaign Goals
            </p>
            <p className="text-[#1B1B1B] font-bold text-base mt-2 line-clamp-1 font-primary">
              $ {campaign?.goal}
            </p>
          </div>
        </div>
        <div className="px-3 py-2 rounded-[10px] bg-[#F4F8FB] flex items-center justify-start gap-3">
          <div>
            <Image
              src="/icons/amount raised.png"
              alt="Icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <p className="text-[#616161] font-medium text-sm  font-primary">
              Amount Raised
            </p>
            <p className="text-primary font-bold text-base mt-2 line-clamp-1 font-primary">
              $ {campaign?.amountRaised || "0"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="px-3 py-2 rounded-[10px] bg-[#F4F8FB] flex items-center justify-start gap-3">
          <div>
            <Image
              src="/icons/calender image.png"
              alt="Icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <p className="text-[#616161] font-medium text-sm font-primary">
              Start Date
            </p>
            <p className="text-[#1B1B1B] font-medium text-base mt-2 line-clamp-1 font-primary">
              {campaign?.startDate
                ? moment(campaign?.startDate).format("D MMM, YYYY")
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="px-3 py-2 rounded-[10px] bg-[#F4F8FB] flex items-center justify-start gap-3">
          <div>
            <Image
              src="/icons/calender image.png"
              alt="Icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <p className="text-[#616161] font-medium text-sm font-primary">
              End Date
            </p>
            <p className="text-[#1B1B1B] font-medium text-base mt-2 line-clamp-1 font-primary">
              {campaign?.endDate
                ? moment(campaign?.endDate).format("D MMM, YYYY")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
