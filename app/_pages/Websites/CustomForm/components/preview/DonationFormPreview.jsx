"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import SelectDonationStep from "./SelectDonationStep";
import InformationStep from "./InformationStep";
import useFormik from "@/hooks/useFormik";
import PaymentStep from "./PaymentStep";

export default function DonationFormPreview({ formState }) {
  const [step, setStep] = useState(1);

  const form = useFormik({
    schema: {},
    defaultValues: {},
  }); // Dummy formik instance
  // Get colors from formState with fallback values
  const primaryColor = formState?.primaryColor || "#3b82f6";
  const textColor = formState?.fieldTextColor || "#1f2937";
  const backgroundColor = formState?.fieldBgColor || "#ffffff";
  const borderColor = formState?.borderColor || "#a8a8a8";
  const buttonTextColor = formState?.buttonTextColor || "#ffffff";

  return (
    <div
      style={{
        boxShadow: "0px 2px 4px 0px #00000014",
        backgroundColor: formState?.formBgColor || "#fff",
      }}
      className={`rounded-lg p-6 max-w-md mx-auto`}
    >
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-medium",
                stepNumber === step ? "text-white" : "bg-white text-gray-500"
              )}
              style={{
                backgroundColor:
                  stepNumber === step ? primaryColor : backgroundColor,
                border:
                  stepNumber !== step ? `1px solid ${borderColor}` : "none",
                color: stepNumber === step ? buttonTextColor : textColor,
              }}
            >
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div
                className="w-16 h-[1px] mx-1"
                style={{ backgroundColor: borderColor }}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div>
        {step === 1 && (
          <SelectDonationStep
            form={form}
            step={step}
            setStep={setStep}
            formState={formState}
          />
        )}
        {step === 2 && (
          <InformationStep
            formState={formState}
            step={step}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <PaymentStep formState={formState} step={step} setStep={setStep} />
        )}
      </div>
    </div>
  );
}
