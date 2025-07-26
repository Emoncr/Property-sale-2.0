"use client";

import { useState, useEffect } from "react";
import { X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "../ui/label";
import toast from "react-hot-toast";

const MultiSelectOptionField = ({
  name,
  form,
  title = "Frequency options",
  description,
  options = [],
  required = true,
  message = null,
  placeholder = "Search",
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formState = form.watch();
  const fieldValue = formState?.recurringDonationOptions || [];

  const handleAddItem = (item) => {
    if (disabled) return;
    const isValueExist = fieldValue.some(
      (option) => option.value === item.value
    );

    if (!isValueExist) {
      form.setValue("recurringDonationOptions", [...fieldValue, item], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      form.setValue(
        "recurringDonationOptions",
        fieldValue.filter((option) => option.value !== item.value),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  };

  const handleRemoveItem = (value) => {
    if (disabled) return;
    if (fieldValue.length > 1) {
      const newValues = fieldValue.filter((item) => item?.value !== value);
      form.setValue("recurringDonationOptions", newValues, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      toast.error("At least one option is required");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".frequency-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
            <div
              className={`frequency-dropdown relative w-full ${
                disabled && "opacity-50"
              }`}
            >
              <div
                className="min-h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                onClick={() => {
                  if (!disabled) {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {fieldValue.length > 0 ? (
                    fieldValue.map((item) => (
                      <Badge
                        key={item?._id}
                        variant="outline"
                        className={`bg-primary text-primary-foreground font-primary py-1 px-2 flex items-center gap-1 hover:scale-105 transition-all duration-300 ease-in-out ${
                          disabled &&
                          "opacity-50 hover:scale-100 cursor-not-allowed "
                        }`}
                      >
                        {item?.label}
                        <X
                          className={`h-3 w-3 cursor-pointer ${
                            disabled && "cursor-not-allowed"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(item?.value);
                          }}
                        />
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground font-primary">
                      Select frequency options
                    </span>
                  )}
                </div>
                <div className="absolute right-3 top-3">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </div>

              {isOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
                  <div className="max-h-60 overflow-y-scroll p-1">
                    {options?.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer"
                        onClick={() => {
                          handleAddItem(option);
                        }}
                      >
                        {fieldValue.some(
                          (item) => item.value === option.value
                        ) && <Check className="h-4 w-4" />}
                        <Label
                          htmlFor={option.id}
                          className="font-primary cursor-pointer flex-1"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}

                    {options.length === 0 && (
                      <div className="p-2 text-center text-muted-foreground font-primary">
                        No options found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
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

export default MultiSelectOptionField;
