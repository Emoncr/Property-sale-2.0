import React from "react";
import PreviewFormButtons from "./PreviewFormButtons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PaymentStep = ({ step, setStep, formState }) => {
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

  return (
    <div>
      <div>
        <p className="font-semibold text-center" style={{ color: primaryColor }}>
          Payment
        </p>
      </div>

      <div className="mt-6">
        <div>
          <Label style={{ color: labelColor }}>Card Number</Label>
          <Input
            name="cardNumber"
            placeholder="Enter your card number"
            type="text"
            required={false}
            className="mt-2"
            style={inputStyle}
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label style={{ color: labelColor }}>MM/YY</Label>
            <Input
              name="mm/yy"
              placeholder="MM/YY"
              type="text"
              required={false}
              className="mt-2"
              style={inputStyle}
            />
          </div>
          <div>
            <Label style={{ color: labelColor }}>CVC Code</Label>
            <Input
              name="cvc"
              placeholder="Enter your cvc"
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
          <Label style={{ color: labelColor }}>Billing ZIP Code</Label>
          <Input
            name="zipCode"
            placeholder="Enter your zip code"
            type="text"
            required={false}
            className="mt-2"
            style={inputStyle}
          />
        </div>
      </div>
      <div className="mt-6">
        <PreviewFormButtons formState={formState} step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default PaymentStep;