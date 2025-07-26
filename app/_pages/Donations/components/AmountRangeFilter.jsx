import React from "react";
import { CalendarIcon, DollarSign, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AmountRangeFilter = ({ filters, setFilters }) => {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold flex items-center gap-2">
          <DollarSign className="size-4" />
          Amount Range
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label
              htmlFor="minAmount"
              className="text-xs font-primary text-muted-foreground"
            >
              Min Amount
            </Label>
            <Input
              id="minAmount"
              type="number"
              placeholder="0"
              value={filters.minAmount || ""}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
              className="font-primary"
            />
          </div>
          <div>
            <Label
              htmlFor="maxAmount"
              className="text-xs font-primary text-muted-foreground"
            >
              Max Amount
            </Label>
            <Input
              id="maxAmount"
              type="number"
              placeholder="∞"
              value={filters.maxAmount || ""}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
              }
              className="font-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AmountRangeFilter;
