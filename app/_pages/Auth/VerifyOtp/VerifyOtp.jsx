"use client";
import FieldOTP from "@/components/Formik/FieldOTP";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { z } from "zod";
import authApis from "../utils/authApis";

// Form validation schema
const formSchema = z.object({
  code: z.string().min(6, {
    message: "Please enter a valid verification code.",
  }),
});

const VerifyOtpForm = () => {
  const { user, updateUser } = useUserStore((state) => state);
  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      code: "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data,
        request: authApis.verifyOtp,
        cacheKey: authApis.cacheKey,
        isToast: true,
        handleComplete: async (dataComplete) => {
          updateUser({
            ...user,
            isEmailVerified: true,
            user: { ...user.user, isEmailVerified: true },
          });
          router.push("/");
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
            VERIFICATION CODE
          </p>
          <p className="font-primary  text-[#616161] font-normal md:text-[16px] 2xl:mt-2 text-center">
            Please enter the verification code sent to your email or phone.
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

              <FormikAction
                {...{
                  isDirty,
                  isSubmitting,
                  fullwidth: true,
                }}
                className="w-full bg-primary hover:bg-primary/90"
              >
                VERIFY
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

export default VerifyOtpForm;
