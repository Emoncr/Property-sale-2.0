import SwitchField from "@/components/Formik/SwitchField";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import PopupKeyCopyButton from "./PopupKeyCopyButton";
import PopupScriptComponent from "./PopupScriptComponent";

const PopupScript = ({ form, formState, campaignId }) => {
  const generatePopupKey = () => {

    const key = Math.random().toString(36).substring(2, 10);
    return "#popup_" + key;
  };
  useEffect(() => {
    // Generate popup key if isPopActive is true and no key exists
    if (formState?.isPopActive && !formState?.popupKey) {
      form.setValue("popupKey", generatePopupKey());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState?.isPopActive, formState?.popupKey]);

  return (
    <div className="mt-2">
      {/* recurring contributions options */}
      <div className="flex items-center justify-between">
        <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
          Show payment form in popup
        </Label>
        <SwitchField form={form} name="isPopActive" />
      </div>
      {formState?.isPopActive && formState?.popupKey && (
        <div className="mt-2">
          <PopupKeyCopyButton popupKey={formState?.popupKey} />
          <div className="mt-4">
            <PopupScriptComponent
              campaignId={campaignId}
              popupKey={formState?.popupKey}
              isPopupActive={formState?.isPopActive}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupScript;
