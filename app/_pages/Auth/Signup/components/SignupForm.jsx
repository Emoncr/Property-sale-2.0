"use client";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import useFormik from "@/hooks/useFormik";
import Image from "next/image";
import Link from "next/link";
import * as z from "zod";
import CheckBoxField from "@/components/Formik/CheckBoxField";
import authApis from "../../utils/authApis";
import useRequest from "@/hooks/useRequest";
import { create_token } from "@/lib/action";
import { useRouter } from "next/navigation";
import { passwordValidationSchema } from "@/utils/passwordSchema";

const SignupForm = () => {
  // Form validation schema
  const formSchema = z
    .object({
      firstName: z.string().min(1, {
        message: "First name is required.",
      }),
      lastName: z.string().min(1, {
        message: "Last name is required.",
      }),
      email: z.string().email({
        message: "Please enter a valid email address.",
      }),
      password: passwordValidationSchema,
      confirmPassword: passwordValidationSchema,
      termsAccepted: z.boolean({
        required_error: "You must accept the terms and policy.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const { handleRequest } = useRequest();
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data,
        request: authApis.signup,
        cacheKey: authApis.cacheKey,
        isToast: true,
        handleComplete: async (dataComplete) => {
          const payload = {
            sub: dataComplete.data.userId,
            email: dataComplete.data.email,/* 
            role: dataComplete.data.role, */
          };
          await create_token(payload);
          router.push("/");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignupHandler = () => {
    // Handle Google sign-up
  };

  return (
    <>
      <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] flex flex-col items-center mt-2 md:mt-4 gap-4 2xl:mt-0 rounded-md px-4 py-4 md:!py-10">
        <div className="w-full flex flex-col items-center justify-center space-y-2 md:space-y-3">
          <h1 className="font-primary text-[20px] 2xl:text-[2rem] text-[#343434] font-semibold uppercase">
            CREATE ACCOUNT
          </h1>
          <p className="font-primary text-[13px] text-muted-foreground font-semibold !md:text-[15px] 2xl:mt-2 text-center">
            Please enter details to create your account
          </p>

          <FormikWrapper form={form} onSubmit={handleSubmit}>
            <div className="w-full space-y-2 md:space-y-4">
              <FieldInput
                form={form}
                name="firstName"
                placeholder="Enter your first name"
                label="First Name"
                type="text"
              />

              <FieldInput
                form={form}
                name="lastName"
                placeholder="Enter your last name"
                label="Last Name"
                type="text"
              />

              <FieldInput
                form={form}
                name="email"
                placeholder="Enter your email address"
                label="Email Address"
                type="email"
              />

              <div className="relative">
                <FieldInput
                  form={form}
                  name="password"
                  placeholder="Enter your password"
                  label="Password"
                  type="password"
                />
              </div>

              <div className="relative">
                <FieldInput
                  form={form}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  type="password"
                />
              </div>

              <div className="flex items-start space-x-2 py-2">
                <CheckBoxField
                  form={form}
                  name="termsAccepted"
                  label="By signing up, you agree to our Terms & Conditions and Privacy Policy"
                  links={[
                    { text: "Terms & Conditions", href: "/terms" },
                    { text: "Privacy Policy", href: "/privacy" },
                  ]}
                />
              </div>

              <FormikAction
                {...{
                  isDirty,
                  isSubmitting,
                  fullwidth: true,
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
              >
                Create Your Account
              </FormikAction>
            </div>
          </FormikWrapper>

          <div className="flex flex-col items-center">
            <p className="font-primary text-[12px] md:text-[13px] 2xl:text-[15px] m-2 md:m-4 text-black-100">
              -or Sign Up with-
            </p>

            <div className="flex gap-5 justify-around my-2 md:my-3">
              <button
                className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={googleSignupHandler}
              >
                <Image
                  src="/images/googleicon.png"
                  alt="google"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center mt-2 md:mt-3">
            <p className="text-black-100 font-primary text-[12px] md:text-[13px] 2xl:text-[15px]">
              Already have an account?{" "}
              <Link
                className="font-primary text-primary font-medium cursor-pointer"
                href="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
