import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const maxWidthClasses = {
  sm: "sm:!max-w-sm",
  md: "sm:!max-w-md",
  lg: "sm:!max-w-lg",
  xl: "sm:!max-w-xl",
  "2xl": "sm:!max-w-2xl",
  "3xl": "sm:!max-w-3xl",
  "4xl": "sm:!max-w-4xl",
};

const Modal = ({
  children,
  element,
  title,
  description,
  maxWidth = "xl", // value can be "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"
  titleSize = "xl", // value can be "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"
  open = false,
  onOpenChange,
  isCancelButtonVisible = false,
}) => {
  const widthClass = maxWidthClasses[maxWidth] || maxWidthClasses.xl;

  return (
    <div>
      {isCancelButtonVisible ? (
        <>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={widthClass}>
              <DialogHeader>
                {title && <DialogTitle className={`text-${titleSize}`}>{title}</DialogTitle>}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
              <div className="grid gap-4 py-4">{element}</div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className={widthClass}>
              <DialogHeader>
                {title && <DialogTitle className={`text-${titleSize}`}>{title}</DialogTitle>}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
              <div className="grid gap-4 py-4">{element}</div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Modal;
