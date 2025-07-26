import FieldInput from "@/components/Formik/FieldInput";
import SwitchField from "@/components/Formik/SwitchField";
import { Label } from "@/components/ui/label";
import React from "react";

const PostSubmit = ({ form }) => {
  return (
    <>
      <div>
        <h2 className="text-xl font-medium mb-4">Post Submit</h2>
        <div className=" mt-4">
          <FieldInput
            form={form}
            name="thankYouMessage"
            placeholder="Enter post submit message"
            type="text"
            multiline={true}
            className="w-full h-[200px]"
            required={false}
            label={"Thank You Message"}
          />
        </div>
        <div className="mt-4">
          <FieldInput
            form={form}
            name="redirectUrl"
            placeholder="https://example.com"
            type="text"
            required={false}
            label={"Redirect URL"}
          />
        </div>
        {/* contributor comments options */}
        <div className="flex items-center justify-between mt-8">
          <Label className="text-base font-normal font-primary text-[#1C1C1C]">
            Enable Social Share
          </Label>
          <SwitchField form={form} name="socialShare" />
        </div>
      </div>
    </>
  );
};

export default PostSubmit;
