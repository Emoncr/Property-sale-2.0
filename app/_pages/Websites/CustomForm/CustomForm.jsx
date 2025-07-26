"use client";

import FormikWrapper from "@/components/Formik/FormikWrapper";
import { Separator } from "@/components/ui/separator";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WebsiteNavbar from "../components/WebsiteNavbar";
import customFormApis from "../utils/customFormApis";
import {
  customFormDefaultValues,
  customFormSchema,
} from "../utils/schema/customFormSchema";
import ConfigureSection from "./components/ConfigureSection";
import FormActionButtons from "./components/FormActionButtons";
import FormStyles from "./components/FormStyles";
import GeneralSettings from "./components/GeneralSettings";
import PostSubmit from "./components/PostSubmit";
import DonationFormPreview from "./components/preview/DonationFormPreview";
import DonationFormLoading from "./components/DonationFormLoading";
import { mutate } from "swr";

export default function CustomForm({
  customFormData,
  isLoading,
  error,
  campaignId,
}) {
  const [settingsType, setSettingsType] = useState("general");

  const form = useFormik({
    schema: customFormSchema,
    defaultValues: customFormDefaultValues(customFormData || {}),
  });
  const { handleRequest } = useRequest();
  const router = useRouter();

  const handleSubmit = async (data) => {
    delete data.campaign; // removed campaignId

    await handleRequest({
      data,
      request: customFormApis.update(customFormData?._id),
      cacheKey: customFormApis.cacheKey,
      isToast: true,
      handleComplete: async (dataComplete) => {
        router.refresh();
        mutate(customFormApis.cacheKey, (prev) => {
          if (!prev) return dataComplete?.data;
          return dataComplete?.data;
        });
      },
    });
  };
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
  return (
    <>
      <FormikWrapper form={form} onSubmit={handleSubmit}>
        <div className="rounded-xl overflow-hidden  border border-gray-200 pb-10 md:px-6 lg:px-8 pt-8 px-3">
          <WebsiteNavbar tabs={navbarOptions} />
          <Separator className="my-4" />
          <>
            {isLoading ? (
              <>
                <DonationFormLoading />
              </>
            ) : (
              <>
                <div className="grid gird-cols-1 lg:grid-cols-2 gap-6">
                  <div className="px-3">
                    <ConfigureSection
                      settingsType={settingsType}
                      settingsTypeChange={setSettingsType}
                    />
                    {/* ============= MAIN FORM CONTENT SECTION COMPONENTS ============= */}
                    <div>
                      {
                        {
                          general: (
                            <GeneralSettings
                              formState={form.watch()}
                              form={form}
                              campaignId={campaignId}
                            />
                          ),
                          styles: (
                            <FormStyles formState={form.watch()} form={form} />
                          ),
                          postSubmit: <PostSubmit form={form} />,
                        }[settingsType]
                      }
                    </div>
                  </div>

                  <div className=" border border-border p-5 rounded-xl">
                    <DonationFormPreview formState={form.watch()} />
                  </div>
                </div>
              </>
            )}
          </>
        </div>
        {!error && (
          <FormActionButtons
            campaignId={campaignId}
            formState={form.watch()}
            form={form}
          />
        )}
      </FormikWrapper>
    </>
  );
}
