import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} = require("@/components/ui/form");

const FieldSelect = ({
  name,
  form,
  title,
  description,
  manualOption = [],
  required = true,
  message = null,
  placeholder = "Select an option",
  disabled = false,
  ...props
}) => {
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
                <SelectValue  placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {manualOption.map((option) => (
                  <SelectItem
                    key={option._id}
                    value={option.value}
                    className="font-primary cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {option.label}
                  </SelectItem>
                ))}
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

export default FieldSelect;
