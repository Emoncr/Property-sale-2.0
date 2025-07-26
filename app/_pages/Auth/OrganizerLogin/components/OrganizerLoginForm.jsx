"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

import { FaFacebook } from "react-icons/fa";
import Image from "next/image";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
// import { useAuth } from "@/contexts/AuthContext";
import * as z from "zod";
import useRequest from "@/hooks/useRequest";
import useFormik from "@/hooks/useFormik";
import { create_token } from "@/lib/action";
import authApis from "../../utils/authApis";
import Link from "next/link";
import { passwordValidationSchema } from "@/utils/passwordSchema";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: passwordValidationSchema,
  rememberMe: z.boolean().optional(),
});

export function OrganizerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [redirectToPlans, setRedirectToPlans] = useState(false);

  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  // Handle Plan Signup Using Plan ID
  const priceId = searchParams.get("price");

  const signupHandler = () => {
    if (priceId) {
      router.push(`/signup/?price=${priceId}`);
    } else {
      router.push("/signup");
    }
  };

  // ============== HANDLE ORGANIZER LOGIN REQUEST ===============//

  const { handleRequest } = useRequest();

  const handleSubmit = async (data) => {
    if (priceId) {
      data.priceId = priceId;
    }
    try {
      await handleRequest({
        data,
        request: authApis.signin,
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

  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google`;
  };

  const fbLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/facebook`;
  };

  useEffect(() => {
    // Check for the 'nav' query param
    const nav = searchParams.get("nav");
    if (nav === "plans") {
      setRedirectToPlans(true);
    }
  }, [searchParams]);

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] flex flex-col items-center mt-4 gap-4 md:mt-[120px] 2xl:mt-0 rounded-md px-4 py-10">
      <div className="w-full flex flex-col items-center justify-center space-y-2 md:space-y-4">
        <p className="font-primary text-xl 2xl:text-[2rem] text-[#343434] font-semibold uppercase">
          Organization SIGN IN
        </p>
        <p className="font-primary text-[13px] text-muted-foreground font-semibold !md:text-[15px] 2xl:mt-2 ">
          Sign in to your{" "}
          <span className="font-bold text-[#343434]">organizer</span> account
        </p>

        <FormikWrapper form={form} onSubmit={handleSubmit}>
          <div className="w-full space-y-4">
            <FieldInput
              form={form}
              name="email"
              placeholder="Enter your email address"
              label="Email address"
            />

            <FieldInput
              form={form}
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
            />

            <div className="w-full flex justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" {...form.register("rememberMe")} />
                <label
                  htmlFor="rememberMe"
                  className="font-primary text-black-300 font-medium text-[12px] md:text-[13px] 2xl:text-[16px]"
                >
                  Remember Me
                </label>
              </div>

              <Link
                href={"/forgot-password"}
                className="font-primary text-primary font-medium text-[12px] md:text-[13px] 2xl:text-[15px] cursor-pointer hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <FormikAction
              {...{
                isDirty,
                isSubmitting: isSubmitting || loading,
                fullwidth: true,
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              SIGN IN
            </FormikAction>
          </div>
        </FormikWrapper>

        <div className="flex flex-col items-center">
          <p className="font-primary text-[12px] md:text-[13px] 2xl:text-[15px] m-4 text-black-100">
            -or Continue with-
          </p>

          <div className="flex gap-5 justify-around my-2 md:my-3">
            <button
              className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={googleLoginHandler}
            >
              <Image
                src="/images/googleicon.png"
                alt="google"
                width={20}
                height={20}
              />
            </button>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={fbLoginHandler}
            >
              <FaFacebook className="h-5 w-5 text-blue-500" />
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center mt-2 md:mt-3">
          <p className="text-black-100 font-primary text-[12px] md:text-[13px] 2xl:text-[15px]">
            {"Don't have an account?"}{" "}
            <button
              type="button"
              className="font-primary text-primary font-medium cursor-pointer"
              onClick={signupHandler}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganizerLoginForm;
