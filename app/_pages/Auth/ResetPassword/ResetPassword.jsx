"use client";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import FormikAction from "@/components/Formik/FormikAction";
import useFormik from "@/hooks/useFormik";
import { z } from "zod";
import FieldOTP from "@/components/Formik/FieldOTP";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import authApis from "../utils/authApis";
import FieldInput from "@/components/Formik/FieldInput";
import { passwordValidationSchema } from "@/utils/passwordSchema";

// Form validation schema
const formSchema = z
  .object({
    password: passwordValidationSchema,
    confirmPassword: passwordValidationSchema,
    code: z.string().min(6, {
      message: "Please enter a valid verification code.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This specifies which field the error is associated with
  });

const ResetPassword = () => {
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data,
        request: authApis.resetPassword,
        cacheKey: authApis.cacheKey,
        handleComplete: async (dataComplete) => {
          router.push("/login");
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
            RESET PASSWORD
          </p>
          <p className="font-primary  text-[#616161] font-normal md:text-[16px] 2xl:mt-2 text-center">
            Please enter your new password and the verification code we sent
            you.
          </p>

          <FormikWrapper form={form} onSubmit={handleSubmit}>
            <div className="w-full space-y-4">
              <FieldOTP
                form={form}
                name="code"
                label="Verification Code"
                description="Enter the 6-digit code we sent you"
                maxLength={6}
              />

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

        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-600">{"Didn't receive a code?"}</p>
          <button
            className="text-primary hover:underline text-semibold font-primary"
            type="button"
          >
            Resend Code
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
