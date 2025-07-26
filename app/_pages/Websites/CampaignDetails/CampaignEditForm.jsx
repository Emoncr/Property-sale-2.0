"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import FieldSelect from "@/components/Formik/select/FieldSelect";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import { ChevronRight, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import WebsiteNavbar from "../components/WebsiteNavbar";
import campaignApis from "../utils/campaignApis";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campaign name is required.",
  }),
  goal: z.number().min(1, {
    message: "Campaign goal is required.",
  }),
  type: z.string().min(1, { message: "Campaign type is required." }),
});

const CampaignEditForm = ({ campaignId, campaignData }) => {
  // Form Data and validation Schema
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      name: campaignData?.name || "",
      type: campaignData?.type || "donations",
      goal: campaignData?.goal || "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();
  // Handle form submission
  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data,
        request: campaignApis.update(campaignId),
        cacheKey: campaignApis.cacheKey,
        isToast: true,
        handleComplete: (completeData) => {

          router.refresh();
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
    <FormikWrapper form={form} onSubmit={handleSubmit}>
      <div>
        <div className="rounded-lg bg-white p-4  w-full h-full border border-gray-200 pb-10 md:px-6 lg:px-8 pt-8">
          <WebsiteNavbar tabs={navbarOptions} />
          <Separator className="my-4" />
          <>
            <div>
              <>
                <div className="space-y-6 py-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldInput
                      form={form}
                      name="name"
                      placeholder="Enter campaign name"
                      label="Campaign Name"
                      type="text"
                    />
                    <FieldInput
                      form={form}
                      name="goal"
                      placeholder="example: 2000"
                      label="Goal"
                      type="number"
                    />
                  </div>
                  <div>
                    <FieldSelect
                      form={form}
                      title="Choose Your Platform (Optional)"
                      name="type"
                      required={true}
                      manualOption={[
                        {
                          _id: "donations",
                          value: "donations",
                          label: "Donations",
                        },
                      ]}
                    />
                  </div>
                </div>
              </>
            </div>
          </>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex gap-4 md:gap-6 lg:gap-8 justify-end">
          <FormikAction
            {...{
              isDirty,
              isSubmitting,
            }}
            className="bg-primary hover:bg-primary/90 px-10 "
          >
            <Save className="w-6 h-6 " />
            Save Changes
          </FormikAction>
          <Button
            type="button"
            variant="outline"
            // onClick={() => onClose()}
            className="px-10 py-2 rounded-md text-sm font-medium text-secondary border border-secondary shadow-sm hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Form
            <ChevronRight className="w-6 h-6 " />
          </Button>
        </div>
      </div>
    </FormikWrapper>
  );
};

export default CampaignEditForm;
