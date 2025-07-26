import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const FormikAction = ({
  isDirty = true,
  isSubmitting,
  isValid = true,
  fullwidth = false,
  children,
  disabled = false,
  variant = "default",
  size = "default",
}) => {
  return (
    <>
      <Button
        className={`${cn(fullwidth && "w-full")} capitalize`}
        type="submit"
        size={size}
        disabled={!isDirty || isSubmitting || !isValid || disabled}
        variant={variant}
        // disabled={true}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader className="w-5 h-5 animate-spin" />
            {children}
          </span>
        ) : (
          children
        )}
      </Button>
    </>
  );
};

export default FormikAction;
