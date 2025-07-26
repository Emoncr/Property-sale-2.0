import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Link from "next/link";

const TermsAndConditionFeild = ({
  name,
  form,
  description,
  label,
  linkName,
  linkUrl,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-start gap-2 justify-start">
            <div className="mt-[5px]">
              <FormControl>
                <Checkbox
                  ref={field.ref}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="flex focus:outline-none focus:ring-1 focus:ring-ring items-center justify-center"
                />
              </FormControl>
            </div>
            <div>
              {label && (
                <FormLabel>
                  {label}
                  <Link href={linkUrl} className=" underline">
                    {linkName}
                  </Link>
                </FormLabel>
              )}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAndConditionFeild;
