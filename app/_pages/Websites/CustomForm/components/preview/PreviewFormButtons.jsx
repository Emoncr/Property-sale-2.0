import React from "react";

const PreviewFormButtons = ({ step, setStep, selectedAmount, formState }) => {
  // Get colors from formState with fallback values
  const primaryColor = formState?.primaryColor || "#3b82f6";
  const buttonTextColor = formState?.buttonTextColor || "#ffffff";

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-3">
      {/* Back Button */}
      <button
        onClick={handleBack}
        disabled={step === 1}
        style={{
          borderColor: primaryColor,
          color: primaryColor,
          borderWidth: '1px',
        }}
        className="w-full py-2.5 px-4 rounded-md font-medium disabled:opacity-60 disabled:cursor-not-allowed text-sm font-primary hover:opacity-90 transition-opacity"
      >
        Back
      </button>
      
      {/* Next/Donate Button */}
      <button
        type="button"
        onClick={handleNext}
        style={{
          backgroundColor: primaryColor,
          color: buttonTextColor,
        }}
        className="w-full py-2.5 px-4 rounded-md font-medium font-primary disabled:opacity-60 disabled:cursor-not-allowed text-sm hover:opacity-90 transition-opacity"
      >
        {formState?.recurringDonation
          ? `Give $${selectedAmount || "0"}/month`
          : `Donate $${selectedAmount || "0"}`}
      </button>
    </div>
  );
};

export default PreviewFormButtons;