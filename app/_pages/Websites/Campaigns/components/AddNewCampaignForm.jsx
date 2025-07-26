"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import FieldSelect from "@/components/Formik/select/FieldSelect";
import { Button } from "@/components/ui/button";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import React from "react";
import * as z from "zod";
import campaignApis from "../../utils/campaignApis";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

const formSchema = z.object({
  campaignName: z.string().min(1, {
    message: "Campaign name is required.",
  }),
  goal: z.number().min(1, {
    message: "Campaign goal is required.",
  }),
  type: z.string().min(1, { message: "Campaign type is required." }),
});


const AddNewCampaignForm = ({ websiteId, onClose }) => {
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      campaignName: "",
      type: "donations",
      goal: null,
    },
  });
  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();

  const handleSubmit = async (data) => {
    const payload = {
      website: websiteId,
      name: data.campaignName,
      goal: Number(data.goal),
      type: data.type,
    };
    try {
      await handleRequest({
        data: payload,
        cacheKey: campaignApis.cacheKey,
        request: campaignApis.create,
        isToast: true,
        handleComplete: (completeData) => {

          if (!completeData?.data) return
          const campaigns = completeData?.data;
          mutate(campaignApis.cacheKey, (prev) => {
            if (!prev) return campaigns;
            return [...prev, campaigns];
          });
          router.refresh();
          onClose();
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <FormikWrapper form={form} onSubmit={handleSubmit}>
        <div className="space-y-6 py-2">
          <FieldInput
            form={form}
            name="campaignName"
            placeholder="Enter campaign name"
            label="Campaign Name"
            type="text"
          />

          <div className="z-50">
            <FieldSelect
              form={form}
              title="Campaign Type"
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

          <FieldInput
            form={form}
            name="goal"
            placeholder="example: 2000"
            label="Goal"
            type="number"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <FormikAction
              {...{
                isDirty,
                isSubmitting,
                fullwidth: true,
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Add
            </FormikAction>
          </div>
        </div>
      </FormikWrapper>
    </>
  );
};

export default AddNewCampaignForm;
