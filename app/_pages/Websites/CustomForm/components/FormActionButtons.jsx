import FormikAction from "@/components/Formik/FormikAction";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { ChevronRight, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import CopyScriptModal from "./CopyScriptModal";

const FormActionButtons = ({ form, campaignId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleContributorWallClick = () => {
    // Create a new URLSearchParams instance
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", "3");
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  const { isDirty, isSubmitting } = form.formState;
  return (
    <>
      <div className="mt-7">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-end">
          <FormikAction
            {...{
              isDirty,
              isSubmitting,
            }}
            variant="outline"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </FormikAction>
          <Modal
            element={<CopyScriptModal campaignId={campaignId} />}
            title="Click copy to add widget to your website."
          >
            <Button
              size="lg"
              type="button"
              className=" py-1 sm:py-2 px-3 sm:px-4 md:px-6 lg:px-10 text-sm sm:text-base"
            >
              Add Form
            </Button>
          </Modal>
          <Button
            onClick={() => {
              handleContributorWallClick();
            }}
            type="button"
            variant="outline"
            size="lg"
            className=" border-secondary text-secondary hover:bg-pink-50"
          >
            Contributor Wall
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormActionButtons;
