import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const CheckBoxField = ({
  name,
  form,
  description,
  label,
  links = [], // Array of link objects: [{text: 'Terms & Conditions', href: '/terms'}, ...]
}) => {
  // Function to render label with links
  const renderLabelWithLinks = () => {
    // If no links provided, just return the label
    if (!links || links.length === 0) {
      return label;
    }

    // If links are provided, parse the label and insert links
    let segments = [];
    let currentText = label;

    // Process each link and split the text
    links.forEach((link, index) => {
      const parts = currentText.split(link.text);

      if (parts.length > 1) {
        // Add the text before the link
        segments.push(parts[0]);

        // Add the link
        segments.push(
          <Link
            key={index}
            href={link.href}
            className="text-primary underline hover:text-primary/80"
          >
            {link.text}
          </Link>
        );

        // Update current text to the remaining text
        currentText = parts.slice(1).join(link.text);
      }
    });

    // Add any remaining text
    if (currentText) {
      segments.push(currentText);
    }

    return <span>{segments}</span>;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-start space-x-2">
              <Checkbox
                ref={field.ref}
                checked={field.value}
                onCheckedChange={field.onChange}
                className="flex focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {label && (
                <FormLabel className="cursor-pointer font-normal">
                  {renderLabelWithLinks()}
                </FormLabel>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckBoxField;
