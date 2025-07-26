import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConfigureSection = ({ settingsType, settingsTypeChange }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-medium mb-4">Configure</h2>

      <div className="mb-6">
        <Select value={settingsType} onValueChange={settingsTypeChange}>
          <SelectTrigger className="w-full font-primary">
            <SelectValue placeholder="General Settings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general" className="font-primary">
              General Settings
            </SelectItem>
            <SelectItem value="styles" className="font-primary">
              Styles
            </SelectItem>
            <SelectItem value="postSubmit" className="font-primary">
              Post Submit
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ConfigureSection;
