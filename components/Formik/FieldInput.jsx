import { useState, useCallback, forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";

const {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} = require("@/components/ui/form");
const { Input } = require("@/components/ui/input");

const FieldInput = forwardRef(({
  name,
  form,
  placeholder,
  label,
  description,
  type = "text",
  disabled,
  multiline,
  required = true,
  message = null,
  isPasteAllowed = true,
  onFocus,
  onClick,
  onKeyUp,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePaste = useCallback(
    (e) => {
      if (!isPasteAllowed) {
        e.preventDefault();
      }
    },
    [isPasteAllowed]
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Handle number type conversion
        const handleChange = (e) => {
          const value = e.target.value;
          if (type === "number") {
            // Convert to number if not empty, or reset to null
            field.onChange(value === "" ? null : Number(value));
          } else {
            field.onChange(value);
          }
        };

        const handleFocus = (e) => {
          field.onFocus?.(e);
          onFocus?.(e);
        };

        const handleClick = (e) => {
          onClick?.(e);
        };

        const handleKeyUp = (e) => {
          onKeyUp?.(e);
        };

        return (
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
              {multiline ? (
                <Textarea
                  placeholder={placeholder}
                  disabled={disabled}
                  className="resize-y"
                  onPaste={handlePaste}
                  onFocus={handleFocus}
                  onClick={handleClick}
                  onKeyUp={handleKeyUp}
                  ref={ref}
                  {...field}
                  {...props}
                />
              ) : (
                <div className="relative">
                  <Input
                    type={type === "password" && showPassword ? "text" : type}
                    placeholder={placeholder}
                    disabled={disabled}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    onClick={handleClick}
                    onKeyUp={handleKeyUp}
                    value={field.value === null ? "" : field.value}
                    onChange={handleChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={ref}
                    {...props}
                  />
                  {type === "password" && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary focus:outline-none"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 " />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
});

FieldInput.displayName = "FieldInput";

export default FieldInput;