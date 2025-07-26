import ColorPickerField from "@/components/Formik/ColorPickerField";
import SwitchField from "@/components/Formik/SwitchField";
import { Label } from "@/components/ui/label";

const ColorSettings = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Color */}
        <div>
          <ColorPickerField
            name="primaryColor"
            form={form}
            label="Progress Color"
          />
        </div>

        {/* Field Text */}
        <div>
          <ColorPickerField
            name="secondaryColor"
            form={form}
            label="Progress Background Color"
          />
        </div>

        {/* Button Text */}
        <div>
          <ColorPickerField
            name="widgetColor"
            form={form}
            label="Widget Color"
          />
        </div>

        {/* Field Background */}
        <div>
          <ColorPickerField
            name="cardBgColor"
            form={form}
            label="Card Background Color"
          />
        </div>

        {/* Label Color */}
        <div>
          <ColorPickerField name="textColor" form={form} label="Text Color" />
        </div>
        {/* Button Background */}
        <div>
          <ColorPickerField
            name="buttonBgColor"
            form={form}
            label="Button Background Color"
          />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Show Donation Progress
          </Label>
          <SwitchField form={form} name="showDonationProgress" />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Show Recent Donations
          </Label>
          <SwitchField form={form} name="showRecentDonations" />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Anonymous Donor
          </Label>
          <SwitchField form={form} name="anonymousDonor" />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Show Load Button
          </Label>
          <SwitchField form={form} name="showLoadButton" />
        </div>
      </div>
    </>
  );
};

export default ColorSettings;
