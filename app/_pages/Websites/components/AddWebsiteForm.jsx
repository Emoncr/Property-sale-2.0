"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import FieldSelect from "@/components/Formik/select/FieldSelect";
import { Button } from "@/components/ui/button";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import * as z from "zod";
import websiteApis from "../utils/websiteApis";
import { useRouter } from "next/navigation";
import WebsiteIntegrationGuide from "./WebsiteIntegrationGuide";
import { useState } from "react";
import { mutate } from "swr";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Website name must be at least 2 characters.",
  }),
  domain: z.string().min(4, {
    message: "Domain must be at least 4 characters.",
  }),
  platform: z.string(),
});

export function AddWebsiteForm({ onClose }) {
  const [isWebsiteCreated, setIsWebsiteCreated] = useState(false);
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      name: "",
      domain: "",
      platform: "",
    },
  });

  function extractCleanDomain(input) {
    const trimmed = input.trim();

    // Add "https://" if no protocol is present
    const urlWithProtocol =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;

    try {
      const url = new URL(urlWithProtocol);
      const hostname = url.hostname; // Extracts "www.youtube.com" or "youtube.com"

      // Remove "www." if desired (optional)
      const cleanDomain = hostname.replace(/^www\./i, ""); // "youtube.com"

      // Return with https://
      return `https://${cleanDomain}`;
    } catch (e) {
      return ""; // Invalid URL
    }
  }

  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();
  // Handle form submission
  const handleSubmit = async (data) => {
    try {
      // Clean up the domain before submitting
      const cleanedDomain = extractCleanDomain(data.domain);

      if (!data.name || cleanedDomain === "") {
        throw new Error("Please provide a valid website name and domain.");
      }

      const payload = {
        ...data,
        domain: cleanedDomain,
      };

      await handleRequest({
        data: payload,
        cacheKey: websiteApis.cacheKey,
        request: websiteApis.create,
        isToast: true,
        handleComplete: (completeData) => {
          const websiteData = completeData?.data;

          if (!websiteData) return;

          const newWebsite = {
            name: websiteData.name || "",
            domain: websiteData.domain || "",
            platform: websiteData.platform || "",
            _id:
              websiteData._id ||
              websiteData.domain ||
              websiteData.name ||
              Date.now(), // fallback ID
          };

          mutate(websiteApis.cacheKey, (prev) => {
            if (!prev) return newWebsite;
            return [...prev, newWebsite];
          });

          router.refresh(); // optional
          setIsWebsiteCreated(true);
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {isWebsiteCreated ? (
        <>
          <WebsiteIntegrationGuide
            websiteDomain={form.watch("domain")}
            onClose={onClose}
          />
        </>
      ) : (
        <>
          <FormikWrapper form={form} onSubmit={handleSubmit}>
            <div className="space-y-6 py-2">
              <FieldInput
                form={form}
                name="name"
                placeholder="Website name"
                label="Name"
                type="text"
              />

              <FieldInput
                form={form}
                name="domain"
                placeholder="www.example.com"
                label="Domain"
                type="text"
              />

              <div>
                <FieldSelect
                  form={form}
                  title="Choose Your Platform (Optional)"
                  manualOption={[
                    {
                      _id: "squarespace",
                      value: "squarespace",
                      label: "Squarespace",
                    },
                    {
                      _id: "wordpress",
                      value: "wordpress",
                      label: "WordPress",
                    },
                    {
                      _id: "wix",
                      value: "wix",
                      label: "Wix",
                    },
                    {
                      _id: "weebly",
                      value: "weebly",
                      label: "Weebly",
                    },
                    {
                      _id: "framer",
                      value: "framer",
                      label: "Framer",
                    },
                    {
                      _id: "other",
                      value: "other",
                      label: "Other",
                    },
                  ]}
                  name="platform"
                  required={false}
                />
              </div>

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
      )}
    </>
  );
}
