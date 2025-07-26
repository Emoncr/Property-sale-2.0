import React from "react";
import ColorPickerField from "@/components/Formik/ColorPickerField";

const FormStyles = ({ form, formState }) => {


  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Color */}
        <div>
          <ColorPickerField name="formBgColor" form={form} label="Form Color" />
        </div>

        {/* Field Text */}
        <div>
          <ColorPickerField
            name="fieldTextColor"
            form={form}
            label="Field text"
          />
        </div>

        {/* Button Text */}
        <div>
          <ColorPickerField
            name="buttonTextColor"
            form={form}
            label="Button Text"
          />
        </div>

        {/* Field Background */}
        <div>
          <ColorPickerField
            name="fieldBgColor"
            form={form}
            label="Field Background"
          />
        </div>

        {/* Button Background */}
        <div>
          <ColorPickerField
            name="primaryColor"
            form={form}
            label="Button Background"
          />
        </div>

        {/* Label Color */}
        <div>
          <ColorPickerField name="labelColor" form={form} label="Label Color" />
        </div>
      </div>

    </div>
  );
};

export default FormStyles;
