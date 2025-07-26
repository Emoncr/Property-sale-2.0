"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import useFormik from "@/hooks/useFormik";
import { passwordValidationSchema } from "@/utils/passwordSchema";
import React from "react";
import { z } from "zod";

const formSchema = z
  .object({
    password: passwordValidationSchema,
    confirmPassword: passwordValidationSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const NewPasswordForm = () => {
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { isDirty, isSubmitting } = form.formState;

  const handleSubmit = async (data) => { };

  return (
    <>
      <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] flex flex-col items-center mt-4 gap-4 md:mt-[120px] 2xl:mt-0 rounded-md px-4 py-10">
        <div className="w-full flex flex-col items-center justify-center space-y-2 md:space-y-4">
          <p className="font-primary text-xl 2xl:text-[2rem] text-[#343434] font-semibold uppercase">
            RESET PASSWORD
          </p>
          <p className="font-primary  text-[#616161] font-normal md:text-[16px] 2xl:mt-2 text-center">
            Please enter your new password.
          </p>

          <FormikWrapper form={form} onSubmit={handleSubmit}>
            <div className="w-full space-y-4">
              <FieldInput
                form={form}
                name="password"
                placeholder="Enter your new password"
                label="Password"
                type="password"
              />
              <FieldInput
                form={form}
                name="confirmPassword"
                placeholder="Confirm your new password"
                label="Confirm Password"
                type="password"
              />
              <FormikAction
                {...{
                  isDirty,
                  isSubmitting,
                  fullwidth: true,
                }}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Reset Password
              </FormikAction>
            </div>
          </FormikWrapper>
        </div>
      </div>
    </>
  );
};

export default NewPasswordForm;
