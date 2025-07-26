"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import authApis from "../utils/authApis";
import { useRouter } from "next/navigation";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ForgotPasswordForm = () => {
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data,
        request: authApis.forgotPassword,
        cacheKey: authApis.cacheKey,
        handleComplete: async (dataComplete) => {
          router.push("/reset-password");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] flex flex-col items-center mt-4 gap-4 md:mt-[120px] 2xl:mt-0 rounded-md px-4 py-10">
        <div className="w-full flex flex-col items-center justify-center space-y-2 md:space-y-4">
          <p className="font-primary text-xl 2xl:text-[2rem] text-[#343434] font-semibold uppercase">
            FORGOT PASSWORD
          </p>
          <p className="font-primary  text-[#616161] font-normal md:text-[16px] 2xl:mt-2 text-center">
            We will send a confirmation message to your email in order to
            recover your password.
          </p>

          <FormikWrapper form={form} onSubmit={handleSubmit}>
            <div className="w-full space-y-4">
              <FieldInput
                form={form}
                name="email"
                placeholder="Enter your email address"
                label="Email Address"
              />

              <FormikAction
                {...{
                  isDirty,
                  isSubmitting,
                  fullwidth: true,
                }}
                className="w-full bg-primary hover:bg-primary/90"
              >
                SEND EMAIL
              </FormikAction>
            </div>
          </FormikWrapper>
        </div>

        <div>
          <Link
            className="text-primary hover:underline text-semibold font-primary"
            href="/login"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
