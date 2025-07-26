"use client";

import React, { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import UploadFile from "@/components/Formik/UploadFile";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import FormikAction from "@/components/Formik/FormikAction";
import useFormik from "@/hooks/useFormik";
import useUserStore from "@/store/userStore";
import { Import } from "lucide-react";
import UploadCsv from "@/components/Formik/UploadCsv";
import { toast } from "sonner";

const CSVFileUploader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const formSchema = z.object({
    csvFile: z
      .array(z.record(z.any()))
      .min(1, { message: "CSV must have at least 1 row" }),
  });


  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      csvFile: null,
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  const handleSubmit = async (data) => {
    setIsOpen(false); // Close modal on success
  };

  const isPremium = !user?.subscribedPlan?.name || user?.subscribedPlan?.features?.importCampaigns === false;

  return (
    <>
      <Button
        className={`w-full bg-secondary hover:bg-secondary/80 md:w-auto flex items-center gap-2 ${isPremium ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={() => {
          if (isPremium) {
            toast.error("You need to upgrade your plan to import campaigns");
          } else {
            setIsOpen(true);
          }
        }}
      >
        <Import size={18} />
        <span>Import</span>
      </Button>

      <Modal
        open={isOpen}
        maxWidth={"2xl"}
        onOpenChange={setIsOpen}
        element={
          <FormikWrapper form={form} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6  py-2 w-full">
              <UploadCsv
                form={form}
                fieldName="csvFile"
                label="Upload your CSV file"
                required={true}
                className="w-full"
              />

              <FormikAction
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                size="lg"
                type="submit"
                className="w-full md:w-auto"
              >
                Upload
              </FormikAction>
            </div>
          </FormikWrapper>
        }
        isCancelButtonVisible
      />
    </>
  );
};

export default CSVFileUploader;

