import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { useState } from "react";

function ConfigureSection({displayType, setDisplayType}) {

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Configure</h2>
        <div className="flex items-center">
          <Info className="h-5 w-5 text-secondary mr-2" />
          <span className="text-secondary font-medium font-primary">
            How It Works?
          </span>
        </div>
      </div>

      <div>
        <Select value={displayType} onValueChange={setDisplayType}>
          <SelectTrigger className="w-full font-primary">
            <SelectValue placeholder="Line Bar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lineBarIndicator" className="font-primary">
              {"Line Bar"}
            </SelectItem>
            <SelectItem value="circularIndicator" className="font-primary">
             {"Circular Indicator"}
            </SelectItem>
            <SelectItem value="graphicalIndicator" className="font-primary">
              {"Graphical Display"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ConfigureSection;
