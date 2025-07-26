import React from "react";
import PreviewFormButtons from "./PreviewFormButtons";
import useFormik from "@/hooks/useFormik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SwitchField from "@/components/Formik/SwitchField";

const InformationStep = ({ step, setStep, formState }) => {
  // Get colors from formState with fallback values
  const primaryColor = formState?.primaryColor || "#3b82f6";
  const labelColor = formState?.labelColor || "#374151";
  const textColor = formState?.fieldTextColor || "#1f2937";
  const backgroundColor = formState?.fieldBgColor || "#ffffff";
  const borderColor = formState?.borderColor || "#a8a8a8";
  const buttonTextColor = formState?.buttonTextColor || "#ffffff";

  const inputStyle = {
    color: textColor,
    borderColor,
    backgroundColor,
  };
  // Dummy formik instance for preview form elements
  const dummyFormInstance = useFormik({
    schema: {},
    defaultValues: {
      donationType: formState?.defaultInterval || "Monthly",
    },
  });
  return (
    <div>
      <div>
        <p
          style={{ color: primaryColor }}
          className="font-semibold text-center"
        >
          Information
        </p>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label style={{ color: labelColor }}>First Name</Label>
            <Input
              name="firstName"
              placeholder="Enter your first name"
              type="text"
              required={false}
              className="mt-2"
              style={inputStyle}
            />
          </div>
          <div>
            <Label style={{ color: labelColor }}>Last Name</Label>
            <Input
              name="lastName"
              placeholder="Enter your last name"
              type="text"
              required={false}
              className="mt-2"
              style={inputStyle}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div>
          <Label style={{ color: labelColor }}>Email</Label>
          <Input
            name="email"
            placeholder="Enter your email"
            type="email"
            required={false}
            className="mt-2"
            style={inputStyle}
          />
        </div>
      </div>
      <div className="mt-6">
        <div>
          <Label style={{ color: labelColor }}>Phone Number</Label>
          <Input
            name="phoneNumber"
            placeholder="Enter your phone number"
            type="text"
            required={false}
            className="mt-2"
            style={inputStyle}
          />
        </div>
      </div>
      {formState?.donorComments && (
        <>
          <div className="mt-6">
            <div>
              <Label style={{ color: labelColor }}>
                Add Comments (optional)
              </Label>
              <Input
                name="comments"
                placeholder="comments"
                type="text"
                required={false}
                className="mt-2"
                style={inputStyle}
              />
            </div>
          </div>
        </>
      )}

      {formState?.isAnonymous && (
        <div className="mt-6 mb-6">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal font-primary text-[#1C1C1C]">
              Do you want this to be an anonymous donation?
            </Label>
            <SwitchField form={dummyFormInstance} name="anonymsDonation" />
          </div>
        </div>
      )}

      <div className="mt-6">
        <PreviewFormButtons step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default InformationStep;
