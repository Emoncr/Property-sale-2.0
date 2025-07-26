"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import countryList from "react-select-country-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CountrySelectorField = ({
  name,
  form,
  title,
  description,
  required = true,
  message = null,
  placeholder = "Select a country",
  disabled = false,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Memoize the country data to prevent recalculations
  const countryData = useMemo(() => countryList().getData(), []);

  // Get country options - memoized
  const countryOptions = useMemo(() => {
    return countryData.map((country) => ({
      value: country.value, // Using the country code as value is more reliable
      label: country.label,
      searchTerm: country.label.toLowerCase(),
    }));
  }, [countryData]);

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.toLowerCase());
    }, 150); // Reduced debounce time

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Memoize filtered options for performance
  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm) {
      return countryOptions.sort((a, b) => a.label.localeCompare(b.label));
    }

    return countryOptions
      .filter((option) => option.searchTerm.includes(debouncedSearchTerm))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [countryOptions, debouncedSearchTerm]);

  const handleSearchTermChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Prevent closing when clicking inside search
  const handleSearchClick = (e) => {
    e.stopPropagation();
  };

  // Virtualization would help here for very large lists, but for ~250 countries it's manageable
  const renderOptions = useMemo(() => {
    return filteredOptions.map((option) => (
      <SelectItem
        key={option.value}
        value={option.value}
        className="font-primary cursor-pointer hover:bg-primary hover:text-primary-foreground"
      >
        {option.label}
      </SelectItem>
    ));
  }, [filteredOptions]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {title && (
            <FormLabel className="font-primary">
              {title}
              {required && (
                <span className="font-bold text-base ml-0.5 text-destructive">
                  *
                </span>
              )}
              {message && (
                <span className="font-primary font-semibold ml-1.5 text-sm text-gray-700">{`( ${message} )`}</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
              {...props}
            >
              <SelectTrigger className="w-full font-primary cursor-pointer">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent
                className="max-h-[300px] overflow-y-auto"
                position="popper"
                ref={(ref) => {
                  // This helps with positioning performance
                  if (ref) {
                    ref.setPosition = () => {};
                  }
                }}
              >
                <div className="pt-1">
                  {filteredOptions.length > 0 ? (
                    renderOptions
                  ) : (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No countries found
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>
          </FormControl>
          {description && (
            <FormDescription className="font-primary">
              {description}
            </FormDescription>
          )}
          <FormMessage className="font-primary" />
        </FormItem>
      )}
    />
  );
};

export default CountrySelectorField;
