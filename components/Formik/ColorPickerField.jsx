import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ColorPickerField = ({
  name,
  form,
  label,
  description,
  disabled,
  required = false,
  message = null,
  ...props
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-medium mb-2 block">
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
            <div className="flex items-center gap-2 relative">
              <Input
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={disabled}
                placeholder="#000000"
                className="w-full pr-12"
                {...props}
              />
              <Popover open={showPicker} onOpenChange={setShowPicker}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-8 h-8 p-0 border border-border rounded-sm absolute right-1"
                    style={{ backgroundColor: field.value || '#ffffff' }}
                    disabled={disabled}
                  >
                    <span className="sr-only">Open color picker</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3 custom-color-picker">
                  <HexColorPicker color={field.value} onChange={field.onChange} />
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium">HEX</span>
                    <HexColorInput
                      color={field.value}
                      onChange={field.onChange}
                      prefixed
                      className="w-24 border rounded px-2 py-1 text-sm"
                    />
                    <div className="ml-auto">
                      <span className="text-sm text-gray-500">100%</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ColorPickerField;