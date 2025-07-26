"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { FaFacebook } from "react-icons/fa";
import Image from "next/image";
import FieldInput from "@/components/Formik/FieldInput";
import FormikAction from "@/components/Formik/FormikAction";
import FormikWrapper from "@/components/Formik/FormikWrapper";
// import { useAuth } from "@/contexts/AuthContext";
import * as z from "zod";
import useRequest from "@/hooks/useRequest";
import useFormik from "@/hooks/useFormik";
import { passwordValidationSchema } from "@/utils/passwordSchema";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: passwordValidationSchema,
  rememberMe: z.boolean(),
});

export function DonorLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("organizer");
  const [redirectToPlans, setRedirectToPlans] = useState(false);
  const { handleRequest } = useRequest();

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

  const forgotPassHandler = () => {
    if (priceId) {
      router.push(`/forgotPassword?price=${priceId}`);
    } else {
      router.push("/forgotPassword");
    }
  };

  const handleSubmit = async (data) => {
    if (priceId) {
      data.priceId = priceId;
    }
    if (selectedRole) {
      data.role = selectedRole;
    }

    // try {
    //   setLoading(true);
    //   await handleRequest({
    //     data,
    //     request: "users/login",
    //     method: "POST",
    //     isToast: true,
    //     handleComplete: (response) => {
    //       localStorage.setItem("token", response.token);
    //       //   handleLogin(response?.role || null);

    //       if (redirectToPlans) {
    //         router.push("/app/accounts?tab=2");
    //       } else {
    //         router.push("/app/");
    //       }
    //     },
    //     handleError: (error) => {
    //       toast.error(error.msg || "An unknown error has occurred.");
    //     },
    //   });
    // } catch (err) {
    //   toast.error("An unknown error has occurred.");
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const googleLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google`;
  };

  const fbLoginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/facebook`;
  };

  /*   useEffect(() => {
      // Check for the 'nav' query param
      const nav = searchParams.get("nav");
      const role = searchParams.get("role");
  
      if (role) {
        if (role === "donor") {
          setSelectedRole("donor");
        } else if (role === "organizer") {
          setSelectedRole("organizer");
        }
      }
  
      if (nav === "plans") {
        setRedirectToPlans(true);
      }
    }, [searchParams]); */

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] flex flex-col items-center mt-4 gap-4 md:mt-[120px] 2xl:mt-0 rounded-md px-4 py-10">
      <div className="w-full flex flex-col items-center justify-center space-y-2 md:space-y-4">
        <p className="font-primary text-xl 2xl:text-[2rem] text-[#343434] font-semibold uppercase">
          Donor SIGN IN
        </p>
        <p className="font-primary text-[13px] text-muted-foreground font-semibold !md:text-[15px] 2xl:mt-2 ">
          Sign in to your{" "}
          <span className="font-bold text-[#343434]">Donor</span> account
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
              <button
                type="button"
                className="font-primary text-primary font-medium text-[12px] md:text-[13px] 2xl:text-[15px] cursor-pointer"
                onClick={forgotPassHandler}
              >
                Forgot Password?
              </button>
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
      </div>
    </div>
  );
}

export default DonorLoginForm;
