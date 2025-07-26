"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { currencyOptions } from "@/data/currencyOptions";
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

const CurrencySelectorField = ({
  name,
  form,
  title,
  description,
  required = true,
  message = null,
  placeholder = "Select a currency",
  disabled = false,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef(null);
  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 600); // 1000ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredOptions = useMemo(() => {
    let options = currencyOptions;

    if (debouncedSearchTerm) {
      options = currencyOptions.filter(
        (option) =>
          option.label
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Sort alphabetically by label
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }, [debouncedSearchTerm]);

  // Reset search term when dropdown closes
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      // Clear search when closing
      setSearchTerm("");
      setDebouncedSearchTerm("");
    }
  };

  const handleSearchTermChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

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
              onOpenChange={handleOpenChange}
              {...props}
            >
              <SelectTrigger className="w-full font-primary cursor-pointer">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]" position="popper">
                {/* <div className="flex items-center px-3 pb-2 sticky -top-1 bg-background z-10 border-b">
                  <Search className="mr-3 h-4 w-4 shrink-0 " />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search currency..."
                    className="h-9 w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                </div> */}
                <div className="pt-1">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="font-primary cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <div className="flex items-center">
                          {/* <span className="mr-2">{option.symbol}</span> */}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No currencies found
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

export default CurrencySelectorField;
