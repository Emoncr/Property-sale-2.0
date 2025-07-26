import SwitchField from "@/components/Formik/SwitchField";
import ContributionOption from "./ContributionOption";
import { Label } from "@/components/ui/label";
import FieldSelect from "@/components/Formik/select/FieldSelect";
import MultiSelectOptionField from "@/components/Formik/MultiSelectOptionField";
import PopupScript from "./PopupScript/PopupScript";

const GeneralSettings = ({ form, formState, campaignId }) => {
  return (
    <div>
      <ContributionOption formState={formState} form={form} />
      <div className="mt-6 max-w-[600px] grid gap-5">
        {/* recurring contributions options */}
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Enable Recurring Contributions
          </Label>
          <SwitchField form={form} name="recurringDonation" />
        </div>
        {/* ============ Default Intervals Options ============ */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
              Default Interval
            </Label>
          </div>
          <div>
            <FieldSelect
              form={form}
              name="defaultInterval"
              manualOption={[
                {
                  _id: "weekly",
                  value: "weekly",
                  label: "Weekly",
                },
                {
                  _id: "biweekly",
                  value: "biweekly",
                  label: "Bi-Weekly",
                },
                {
                  _id: "monthly",
                  value: "monthly",
                  label: "Monthly",
                },
                {
                  _id: "yearly",
                  value: "yearly",
                  label: "Yearly",
                },
              ]}
              disabled={!formState?.recurringDonation}
            />
          </div>
        </div>
        {/* ============ Recurring Contributions Options ============ */}
 
        <div>
          <MultiSelectOptionField
            options={[
              { id: "weekly", label: "Weekly", value: "weekly" },
              { id: "biweekly", label: "Bi-Weekly", value: "biweekly" },
              { id: "monthly", label: "Monthly", value: "monthly" },
              { id: "yearly", label: "Yearly", value: "yearly" },
            ]}
            form={form}
            name="recurringDonationOption"
            title="Available Intervals"
            disabled={!formState?.recurringDonation}
          />
        </div>

        {/* contributor comments options */}
        <div className="flex items-center justify-between mt-4">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Enable Contributor Comments
          </Label>
          <SwitchField form={form} name="donorComments" />
        </div>
        {/* fee coverage options */}
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Allow Fee Coverage
          </Label>
          <SwitchField form={form} name="coverProcessingFee" />
        </div>
        {/* contributions by companies options */}
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Enable Contributions By Companies
          </Label>
          <SwitchField form={form} name="donationByCompany" />
        </div>
        {/* anonymous contributions options */}
        <div className="flex items-center justify-between">
          <Label className="text-base lg:text-lg font-normal font-primary text-[#1C1C1C]">
            Enable Anonymous Contributions
          </Label>
          <SwitchField form={form} name="isAnonymous" />
        </div>

        {/* Popup Script Component */}
        <PopupScript
          campaignId={campaignId}
          form={form}
          formState={formState}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
