import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useRequest from "@/hooks/useRequest";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";

const defaultTrigger = (
  <Button size="icon" variant="outline" className="rounded-full">
    <Trash className="h-4 w-4" />
  </Button>
);

const ConfirmationAlert = ({
  requestEndpoint,
  trigger,
  payload,
  handleDone,
  title,
  description,
  currentStatus,
  cacheKey, // send cache key and id for single delete request & update data instantly
  id,
  children,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const { isLoading, handleRequest } = useRequest();

  async function handleDelete() {
    try {
      await handleRequest({
        data: payload,
        id,
        cacheKey,
        isDelete: false,
        request: requestEndpoint,
        isToast: true,
        handleComplete: async (data) => {
          await handleDone(data);
          setOpen(false);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (disabled) return children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-primary">{title}?</DialogTitle>
          {description && (
            <DialogDescription className="font-primary">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-5">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isLoading || disabled} onClick={handleDelete}>
            {isLoading ? (
              <Loader className="mr-2 w-7 h-7 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationAlert;
