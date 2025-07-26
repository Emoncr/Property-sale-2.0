"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FieldOTP = ({
  name,
  form,
  label,
  description,
  maxLength = 6,
  disabled,
  required = true,
  message = null,
  pattern = /^[0-9]+$/,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && (
                <span className="font-bold text-base ml-0.5 text-destructive">
                  *
                </span>
              )}
              {message && (
                <span className="font-semibold ml-1.5 text-sm text-gray-700">{`( ${message} )`}</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <InputOTP
              maxLength={maxLength}
              disabled={disabled}
              pattern={pattern}
              {...field}
              {...props}
            >
              <InputOTPGroup>
                {[...Array(maxLength)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldOTP;
