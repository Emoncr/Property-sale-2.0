import Image from "next/image";
import { useState } from "react";

const ToggleButton = ({ form, formState }) => {
  const [selected, setSelected] = useState("onetime");
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div
        style={{ boxShadow: "0px 2px 4px 0px #00000014 inset" }}
        className="w-full inline-flex rounded-[14px] bg-[#F8F8F8] p-0.5 relative mt-7 h-[52px]  mx-auto"
      >
        <div
          className={`absolute inset-0 m-[6px] rounded-[11px] transition-all duration-300 ease-in-out ${
            selected === "monthly" ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            width: "calc(50% - 6px)",
            backgroundColor: formState?.primaryColor || "#008C8B",
          }}
        />
        <button
          type="button"
          style={{
            color: selected === "onetime" && formState?.buttonTextColor,
          }}
          className={`relative flex-1 px-3 py-1 s:px-4 s:py-2 font-medium rounded-md transition-all duration-300 ease-in-out text-xs font-primary s:text-sm text-[#969696] hover:text-gray-700`}
          onClick={() => setSelected("onetime")}
        >
          One Time
        </button>
        <button
          type="button"
          style={{
            color: selected === "monthly" && formState?.buttonTextColor,
          }}
          className={`relative flex-1 px-3 py-1 s:px-4 s:py-2 font-medium rounded-md transition-all duration-300 ease-in-out flex items-center justify-center text-xs s:text-sm text-gray-500 hover:text-gray-700 font-primary`}
          onClick={() => setSelected("monthly")}
        >
          {formState?.recurringDonationOptions[0]?.label}
          <div className="ml-1 s:ml-2">
            <Image
              src={"/icons/heart_icon.png"}
              alt="Heart Image"
              loading="lazy"
              width={20}
              height={20}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default ToggleButton;
