"use client";
import Modal from "@/components/ui/Modal";
import { LucidePlus } from "lucide-react";
import React from "react";
import AddNewCampaignForm from "./AddNewCampaignForm";

const AddCampaignButton = ({ websiteId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[385px] h-[254px]  p-5  rounded-[10px]  bg-transparent flex items-center justify-center border-primary/50 border-2 border-dashed hover:bg-primary/10 duration-500 m-1 mt-0 disabled:border-gray-100/80 disabled:hover:bg-gray-100/40"
      >
        <span className="flex items-center gap-2 text-primary  justify-center ">
          <LucidePlus className="text-xl text-primary" />
          Create New Campaign
        </span>
      </button>
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => setIsModalOpen(open)}
        element={<AddNewCampaignForm websiteId={websiteId} onClose={() => setIsModalOpen(false)} />}
        title="Create New Campaign"
        isCancelButtonVisible={true}
      />
    </>
  );
};

export default AddCampaignButton;
