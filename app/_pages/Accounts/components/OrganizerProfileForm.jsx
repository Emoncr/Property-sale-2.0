"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import FieldSelect from "@/components/Formik/select/FieldSelect";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import UploadFile from "@/components/Formik/UploadFile";
import React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import userAccountApis from "../utils/accountApis";
import CurrencySelectorField from "@/components/Formik/CurrencySelectorField";
import CountrySelectorField from "@/components/Formik/CountrySelectorField";


const formSchema = z.object({
  organizationName: z.string().optional(),
  organizationType: z.string().optional(),
  organizationWebsite: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPersonEmail: z.string().optional(),
  defaultCurrency: z.string().optional(),
  taxId: z.string().optional(),
  organizationAddress: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  hasTaxReceiptAuthorization: z.string().optional(),
  organizationLogo: z.any().optional().nullable(),
});

export default function OrganizerProfileForm() {
  const { user, updateUser } = useUserStore((state) => state);




  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      organizationName: user?.organizationName || "",
      organizationType: user?.organizationType || "",
      organizationWebsite: user?.websiteUrl || "",
      contactPerson:
        `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "",
      contactPersonEmail: user?.contactPersonEmail || "",

      defaultCurrency: user?.defaultCurrency || "",
      taxId: user?.taxId || "",
      organizationAddress: user?.organizationAddress || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
      country: user?.country || "",
      hasTaxReceiptAuthorization: user?.hasTaxReceiptAuthorization || "no",
      organizationLogo: user?.organizationLogo === "null" || user?.organizationLogo == null ? null : user?.organizationLogo, // Always start with null for file inputs
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();

  const handleSubmit = async (data) => {
    const payload = { ...data };

    const keysToUpdate = [
      "_id",
      "user",
      "firstName",
      "lastName",
      "email",
      "organizationName",
      "organizationType",
      "organizationAddress",
      "city",
      "postalCode",
      "defaultCurrency",
      "websiteUrl",
      "contactPersonEmail",
      "taxId",
      "country",
      "organizationLogo"
    ];






    try {
      await handleRequest({
        data: payload,
        request: userAccountApis.update(user?._id),
        cacheKey: userAccountApis.cacheKey,
        isToast: true,
        isFormData: true, // Set to true if we have a file
        handleComplete: (completeData) => {
          const keysToUpdate = [
            "_id", "firstName", "lastName", "email", "organizationName",
            "organizationType", "organizationAddress", "city", "postalCode",
            "defaultCurrency", "websiteUrl", "contactPersonEmail", "taxId",
            "country", "organizationLogo"
          ];

          const filteredData = {};

          // Copy matching top-level keys from response
          for (const key of keysToUpdate) {
            if (key in completeData?.data) {
              filteredData[key] = completeData.data[key];
            }
          }
          // Update Zustand store
          updateUser(filteredData);
          router.refresh();


        }


      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <FormikWrapper form={form} onSubmit={handleSubmit}>
        <div>
          <h2 className="text-lg font-semibold font-primary">
            Account / Org Info
          </h2>

          <div className="space-y-6 mt-8">
            <FieldInput
              form={form}
              name="organizationName"
              placeholder="Enter organization name"
              label="Organization Name"
              type="text"
              required={false}
            />
            <div className="mt-6">
              <FieldSelect
                form={form}
                title="Are you a registered to issue tax-deductible receipts?"
                name="hasTaxReceiptAuthorization"
                required={true}
                placeholder="Select an option"
                manualOption={[
                  {
                    _id: "yes",
                    value: "yes",
                    label: "Yes",
                  },
                  {
                    _id: "no",
                    value: "no",
                    label: "No",
                  },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {form.watch("hasTaxReceiptAuthorization") === "yes" && (
                <FieldInput
                  form={form}
                  name="taxId"
                  placeholder="Enter tax ID"
                  label="Tax ID / EIN / ABN"
                  type="text"
                  required={false}
                />
              )}

              <div>
                <CurrencySelectorField
                  name="defaultCurrency"
                  form={form}
                  title="Select default currency"
                  required={false}
                />
              </div>
            </div>

            <div className="space-y-2 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <FieldInput
                  form={form}
                  name="organizationAddress"
                  placeholder="Street address"
                  label="Organization Address"
                  type="text"
                  required={false}
                />

                <FieldInput
                  form={form}
                  name="city"
                  placeholder="City"
                  label="City"
                  type="text"
                  required={false}
                />

                <FieldInput
                  form={form}
                  name="postalCode"
                  placeholder="Postal code"
                  label="Postal Code"
                  type="text"
                  required={false}
                />

                <div className="z-30">
                  <CountrySelectorField
                    name="country"
                    form={form}
                    title="Country"
                    description="Select your country"
                    required={false}
                  />
                </div>
              </div>
              <div>
                <UploadFile
                  form={form}
                  fieldName="organizationLogo"
                  label="Upload Organization Logo"
                  maxSize={2 * 1024 * 1024}
                  required={false}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <FormikAction
                {...{
                  isDirty,
                  isSubmitting,
                }}
                size="lg"
                type="submit" // Make sure this is explicit
              >
                Save Changes
              </FormikAction>
            </div>
          </div>
        </div>
      </FormikWrapper>
    </>
  );
}
