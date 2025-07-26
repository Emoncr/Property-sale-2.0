import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import PreviewFormButtons from "./PreviewFormButtons";
import ToggleButton from "./ToggleButton";
import FieldSelect from "@/components/Formik/select/FieldSelect";
import useFormik from "@/hooks/useFormik";
import SwitchField from "@/components/Formik/SwitchField";

const SelectDonationStep = ({ step, setStep, form, formState }) => {
  const [amountValue, setAmountValue] = useState(null);
  // Get default payment amounts from data if available
  const defaultAmounts =
    formState?.paymentAmounts?.map((item) => item.amount) || [];

  const handleAmountSelect = (value) => {
    if (value) {
      setAmountValue(value);
    }
  };

  // Dummy formik instance for preview form elements
  const dummyFormInstance = useFormik({
    schema: {},
    defaultValues: {
      donationType: formState?.defaultInterval || "Monthly",
    },
  });

  // Get colors from formState with fallback values
  const primaryColor = formState?.primaryColor || "#3b82f6";
  const labelColor = formState?.labelColor || "#374151";
  const textColor = formState?.fieldTextColor || "#1f2937";
  const backgroundColor = formState?.fieldBgColor || "#ffffff";
  const borderColor = formState?.borderColor || "#a8a8a8";

  return (
    <div style={{ backgroundColor }}>
      <h2
        style={{ color: labelColor }}
        className="text-xl font-semibold text-center mb-6"
      >
        Select Your Donation
      </h2>

      {/* Donation Type Selection */}
      {formState?.recurringDonation ? (
        <div className="mb-6">
          <FieldSelect
            form={dummyFormInstance}
            name="donationType"
            manualOption={formState?.recurringDonationOptions || []}
            placeholder="Select Donation Type"
            style={{
              color: textColor,
              borderColor,
            }}
          />
        </div>
      ) : (
        <div className="mb-6">
          <ToggleButton
            formState={formState}
            form={form}
            primaryColor={primaryColor}
          />
        </div>
      )}

      {/* Preset Amounts - Using values from form data */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {defaultAmounts.map((value) => (
          <button
            type="button"
            key={value}
            className={cn(
              "py-3 px-4 rounded-md border font-medium font-primary text-sm",
              amountValue === value
                ? `border-[${primaryColor}] text-[${primaryColor}] bg-[${primaryColor}]/10`
                : `border-[${borderColor}] text-[${textColor}]`
            )}
            style={{
              borderColor: amountValue === value ? primaryColor : borderColor,
              color: amountValue === value ? primaryColor : textColor,
              backgroundColor:
                amountValue === value ? `${primaryColor}1a` : "transparent",
            }}
            onClick={() => handleAmountSelect(value)}
          >
            ${value}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-6">
        <Label style={{ color: labelColor }}>Enter Custom Amount:</Label>
        <div className="relative rounded-md mt-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span
              className="font-primary font-bold"
              style={{ color: "#353535" }}
            >
              {formState?.currency?.symbol || "$"}
            </span>
          </div>
          <input
            type="text"
            name="custom-amount"
            id="custom-amount"
            className="block w-full rounded-md pl-7 pr-12 py-3 border focus:ring-2 sm:text-sm font-primary font-bold"
            style={{
              color: textColor,
              borderColor,
              backgroundColor,
              focusBorderColor: primaryColor,
              focusRingColor: primaryColor,
            }}
            placeholder="0.00"
            value={amountValue || ""}
            onChange={(e) => {
              setAmountValue(e.target.value);
            }}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span
              className="sm:text-sm font-primary font-bold"
              style={{ color: "#353535" }}
            >
              {formState?.currency?.name || "USD"}
            </span>
          </div>
        </div>
      </div>


      {formState?.coverProcessingFee && (
        <div className="mt-6 mb-6">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal font-primary text-[#1C1C1C]">
              Cover Processing Fee
            </Label>
            <SwitchField form={dummyFormInstance} name="coverProcessingFee" />
          </div>
        </div>
      )}

      <PreviewFormButtons
        step={step}
        setStep={setStep}
        selectedAmount={amountValue}
        formState={formState}
        primaryColor={primaryColor}
      />
    </div>
  );
};

export default SelectDonationStep;
