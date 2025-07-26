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

const DeleteModal = ({
  deleteRequest,
  trigger,
  handleDone,
  title,
  // send cachekey and id for single delete request & update data instantly
  cacheKey,
  id,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const { isLoading, handleRequest } = useRequest();

  async function handleDelete() {
    try {
      await handleRequest({
        id,
        cacheKey,
        isDelete: !!cacheKey,
        request: deleteRequest,
        isToast: true,
        handleComplete: (data) => {
          setOpen(false);
          if (handleDone) {
            handleDone(data);
          }
        },
      });
    } catch (error) {
      console.error(error);
      setOpen(false);
    } finally {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure to Delete {title}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? (
              <Loader className="mr-2 w-7 h-7 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
