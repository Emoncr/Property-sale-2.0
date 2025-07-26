"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Plus } from "lucide-react";
import React from "react";
import { AddWebsiteForm } from "./AddWebsiteForm";

const AddWebsite = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        element={<AddWebsiteForm onClose={() => setIsOpen(false)} />}
        title="Add New Website"
        isCancelButtonVisible={true}
      />
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary/90"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Website
      </Button>
    </>
  );
};

export default AddWebsite;
