import FormikAction from "@/components/Formik/FormikAction";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import CopyScriptModal from "../../CustomForm/components/CopyScriptModal";
import ContributorWallScript from "./preview/ContributorWallScript";

const ActionButtonsContributorWall = ({ form, campaignId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFormButtonClick = () => {
    // Create a new URLSearchParams instance
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", "2");
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  const { isDirty, isSubmitting } = form.formState;
  return (
    <>
      <div className="mt-7 ">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              handleFormButtonClick();
            }}
            className="border-secondary text-secondary hover:bg-pink-50"
          >
            <ChevronLeft />
            Form
          </Button>
          <FormikAction
            {...{
              isDirty,
              isSubmitting,
            }}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto py-1 sm:py-2 px-3 sm:px-4 md:px-6 lg:px-10 text-sm sm:text-base"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </FormikAction>
          <Modal
            title={"Click copy to add widget to your website."}
            element={<ContributorWallScript campaignId={campaignId} />}
          >
            <Button type="button" size="lg">
              Add Wall
            </Button>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ActionButtonsContributorWall;
