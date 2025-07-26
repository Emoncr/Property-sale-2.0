"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import authApis from "../../Auth/utils/authApis";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const EmailConfirmationModal = ({ onclose }) => {
  const { user } = useUserStore((state) => state);
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      email: user?.email || "",
    },
  });
  const { isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data,
        request: authApis.verifyEmail,
        cacheKey: authApis.cacheKey,
        isToast: false,
        handleComplete: async (dataComplete) => {
          toast.success(
            `We've sent a confirmation email to ${user?.email}. Please check your inbox to continue.`
          );
          if (onclose) onclose();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormikWrapper form={form} onSubmit={handleSubmit}>
        <div className="w-full space-y-4">
          <FieldInput
            form={form}
            name="email"
            placeholder="Enter your email address"
            label="Email Address"
            disabled
          />

          <div className="flex justify-end">
            <FormikAction
              {...{
                isSubmitting,
              }}
            >
              Confirm
            </FormikAction>
          </div>
        </div>
      </FormikWrapper>
    </>
  );
};

export default EmailConfirmationModal;
