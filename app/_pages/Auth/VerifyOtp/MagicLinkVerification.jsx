"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import useRequest from "@/hooks/useRequest";
import authApis from "../utils/authApis";
import useUserStore from "@/store/userStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MagicLinkVerification = () => {
  const { user, updateUser } = useUserStore((state) => state);
  const [verificationState, setVerificationState] = useState("verifying");
  const [message, setMessage] = useState("");
  const { handleRequest } = useRequest();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [redirectingTime, setRedirectingTime] = useState(5);

  const verifyMagicLink = async () => {
    setVerificationState("verifying");
    try {
      await handleRequest({
        data: null,
        token: token,
        request: authApis.verifyCode,
        cacheKey: authApis.cacheKey,
        isToast: false,
        handleComplete: () => {
          updateUser({
            ...user,
            isEmailVerified: true,
            user: { ...user.user, isEmailVerified: true },
          });
          setVerificationState("success");
          handleDashboardRedirect();
          setMessage("Your email has been verified successfully");
        },
        handleError: (error) => {
          setVerificationState("error");
          setMessage("Verification failed. Link may have expired.");
        },
      });
    } catch (error) {
      setVerificationState("error");
      setMessage("Verification failed. Link may have expired.");
    }
  };

  useEffect(() => {
    if (!token) {
      setVerificationState("error");
      setMessage("Invalid verification link");
      return;
    }

    verifyMagicLink();
  }, []);

  const handleResendLink = async () => {
    setVerificationState("verifying");
    try {
      await handleRequest({
        data: { email: user?.email },
        request: authApis.verifyCode,
        cacheKey: authApis.cacheKey,
        isToast: true,
        handleComplete: () => {
          updateUser({
            ...user,
            isEmailVerified: true,
            user: { ...user.user, isEmailVerified: true },
          });
          setVerificationState("success");
          setMessage("Your email has been verified successfully");
          handleDashboardRedirect();
        },
      });
    } catch (error) {
      setMessage("Failed to resend verification link");
      setVerificationState("error");
    }
  };

  const handleDashboardRedirect = () => {
    setRedirectingTime(5);

    const countdown = setInterval(() => {
      setRedirectingTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Verifying State Component
  const VerifyingState = () => (
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-16 w-16 text-primary animate-spin" />
      <h2 className="font-primary text-2xl font-semibold text-gray-900">
        Verifying Your Email
      </h2>
      <p className="font-primary text-base text-gray-600 max-w-md">
        Please wait while we verify your email address
      </p>
    </div>
  );

  // Success State Component
  const SuccessState = () => (
    <div className="flex flex-col items-center space-y-4">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <h2 className="font-primary text-2xl font-semibold text-gray-900">
        Email Verified Successfully!
      </h2>
      <p className="font-primary text-base text-gray-600 max-w-md">
        {redirectingTime > 0 &&
          `Redirecting you to dashboard in ${redirectingTime} seconds...`}
      </p>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="flex flex-col items-center space-y-4">
      <XCircle className="h-16 w-16 text-rose-500" />
      <h2 className="font-primary text-2xl font-semibold text-rose-500">
        Verification Failed
      </h2>
      <p className="font-primary text-base text-gray-600 max-w-md">
        {message || "Verification failed. Link may have expired."}
      </p>
      <div className="w-full max-w-xs pt-4">
        <Button variant="outline" size="sm" onClick={handleResendLink}>
          <RotateCcw />
          Try Again
        </Button>
      </div>
    </div>
  );

  // Render appropriate state component
  const renderStateComponent = () => {
    switch (verificationState) {
      case "verifying":
        return <VerifyingState />;
      case "success":
        return <SuccessState />;
      case "error":
        return <ErrorState />;
      default:
        return <ErrorState />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/10 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl !shadow-none border border-primary/70 p-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={220}
              height={80}
              priority
              quality={100}
              className="object-cover"
            />
          </div>
          {/* Dynamic State Content */}
          {renderStateComponent()}
        </div>
      </div>
    </div>
  );
};

export default MagicLinkVerification;
