"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterTab() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const propertyTypes = [
    { value: "all", label: "All" },
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
  ];

  const bedroomOptions = [
    { value: "any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="h-4 w-4 text-gray-600 mr-2" />
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div className="space-y-1">
          <Label htmlFor="search" className="text-xs font-medium text-gray-700">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search properties..."
            className="h-8 text-sm"
          />
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">
            Property Type
          </Label>
          <div className="grid grid-cols-2 gap-1">
            {propertyTypes.map((type) => (
              <Button
                key={type.value}
                variant={
                  selectedPropertyType === type.value ? "default" : "outline"
                }
                size="sm"
                className={`h-7 text-xs ${
                  selectedPropertyType === type.value
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : ""
                }`}
                onClick={() => setSelectedPropertyType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1">
          <Label className="text-xs font-medium text-gray-700">Location</Label>
          <Select>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="uptown">Uptown</SelectItem>
              <SelectItem value="suburbs">Suburbs</SelectItem>
              <SelectItem value="waterfront">Waterfront</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Bedrooms</Label>
          <div className="grid grid-cols-3 gap-1">
            {bedroomOptions.map((option) => (
              <Button
                key={option.value}
                variant={
                  selectedBedrooms === option.value ? "default" : "outline"
                }
                size="sm"
                className={`h-7 text-xs ${
                  selectedBedrooms === option.value
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : ""
                }`}
                onClick={() => setSelectedBedrooms(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">
            Price Range
          </Label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>$0</span>
              <span>
                {priceRange[1] >= 10000000
                  ? "$10M+"
                  : `${(priceRange[1] / 1000000).toFixed(1)}M`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
          <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
            Apply Filters
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}