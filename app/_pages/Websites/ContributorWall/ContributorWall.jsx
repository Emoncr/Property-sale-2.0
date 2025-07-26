"use client";

import FormikWrapper from "@/components/Formik/FormikWrapper";
import { Separator } from "@/components/ui/separator";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import WebsiteNavbar from "../components/WebsiteNavbar";
import contributorWallApis from "../utils/contributorWallApis";
import ActionButtonsContributorWall from "./components/ActionButtonsContributorWall";
import ColorSettings from "./components/ColorSettings";
import ConfigureSection from "./components/ConfigureSection";
import ContributorWallPreview from "./components/preview/ContributorWallPreview";

const formSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  widgetColor: z.string().optional(),
  cardBgColor: z.string().optional(),
  buttonBgColor: z.string().optional(),
  textColor: z.string().optional(),
  showDonationProgress: z.boolean().optional(),
  showRecentDonations: z.boolean().optional(),
  showDonationDate: z.boolean().optional(),
  anonymousDonor: z.boolean().optional(),
  showLoadButton: z.boolean().optional(),
});

export default function ContributorWall({ contributorWallData, campaignId }) {
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      primaryColor: contributorWallData?.primaryColor || "#008C8B",
      secondaryColor: contributorWallData?.secondaryColor || "#E5EAFC",
      widgetColor: contributorWallData?.widgetColor || "#ffffff",
      cardBgColor: contributorWallData?.cardBgColor || "#fbfbfb",
      buttonBgColor: contributorWallData?.buttonBgColor || "#008C8B",
      textColor: contributorWallData?.textColor || "#ffffff",
      showDonationProgress: contributorWallData?.showDonationProgress || true,
      showRecentDonations: contributorWallData?.showRecentDonations || true,
      showDonationDate: contributorWallData?.showDonationDate || true,
      anonymousDonor: contributorWallData?.anonymousDonor || false,
      showLoadButton: contributorWallData?.showLoadButton || false,
    },
  });

  const [displayType, setDisplayType] = useState("lineBarIndicator");
  const navbarOptions = [
    {
      id: 1,
      name: "Campaign Details",
      route: "",
    },
    {
      id: 2,
      name: "Form",
      route: "",
    },
    {
      id: 3,
      name: "Contributor Wall",
      route: "",
    },
  ];
  const { handleRequest } = useRequest();
  const router = useRouter();

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSubmit = async (data) => {
    await handleRequest({
      data,
      request: contributorWallApis.update(contributorWallData?._id),
      cacheKey: contributorWallApis.cacheKey,
      isToast: true,
      handleComplete: async (dataComplete) => {
        router.refresh();
      },
    });
  };
  const isEmptyFormData =
    !contributorWallData || Object.keys(contributorWallData).length === 0;
  return (
    <>
      <FormikWrapper form={form} onSubmit={handleSubmit}>
        <div className="rounded-xl overflow-hidden border  border-gray-200 pb-10 md:px-6 lg:px-8 pt-8">
          <WebsiteNavbar tabs={navbarOptions} />
          <Separator className="my-4" />
          {isEmptyFormData ? (
            <>
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <h2 className="text-2xl font-bold text-gray-800 uppercase">
                  No contributor wall settings found
                </h2>
                <p className="mt-4 text-gray-600">
                  Something went wrong, please try again later.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="grid gird-cols-1 lg:grid-cols-5 gap-6 ">
                <div className="lg:col-span-3 px-6">
                  <ConfigureSection
                    displayType={displayType}
                    setDisplayType={setDisplayType}
                  />
                  <div className="mt-6">
                    <ColorSettings form={form} formState={form.watch()} />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <ContributorWallPreview
                    displayType={displayType}
                    formState={form.watch()}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-6">
          <ActionButtonsContributorWall form={form} campaignId={campaignId} />
        </div>
      </FormikWrapper>
    </>
  );
}
