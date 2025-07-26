import React from "react";
import { Pencil, Trash2, Target, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/common/DeleteModal";
import campaignApis from "../../utils/campaignApis";
import ActivationToggle from "@/components/common/ActivationToggle";
import Link from "next/link";
import { mutate } from "swr";

const CampaignOptionModal = ({
  campaignId,
  isDisabled,
  onClose,
  campaign,
  websiteId,
}) => {
  const router = useRouter();
  const handleEdit = () => {
    if (campaign?.isActive) return;
    router.push(`/websites/${websiteId}/campaign/${campaignId}`);
    onClose?.();
  };

  return (
    <DropdownMenuContent className="w-48" align="end">
      <Link href={`/websites/${websiteId}/campaign/${campaignId}`}>
        <DropdownMenuItem className="cursor-pointer">
          <Pencil className="mr-1 h-4 w-4" />
          <span className="font-primary">Edit</span>
        </DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <ActivationToggle
        id={campaign?._id}
        title={`Confirm ${campaign?.isActive ? "Deactivation" : "Activation"
          } of "${campaign?.name}`} // Title of the action
        cacheKey={campaignApis.cacheKey}
        editRequest={campaignApis.update(campaign?._id)}
        currentStatus={campaign?.isActive}
        handleDone={async () => {
          router.refresh();
        }}
      >
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          {campaign?.isActive ? (
            <MdDoNotDisturbAlt className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          <span>{campaign?.isActive ? "Deactivate" : "Activate"}</span>
        </DropdownMenuItem>
      </ActivationToggle>

      <DropdownMenuSeparator />


      <DeleteModal
        id={campaignId}
        title={campaign?.name}
        cacheKey={campaignApis.cacheKey}
        deleteRequest={campaignApis.delete(campaignId)}
        handleDone={async () => {
          mutate(
            campaignApis.cacheKey,
            (prev = []) =>
              prev.filter((site) => site._id !== campaignId),
            { revalidate: false }
          );
          router.refresh();
        }}
      >
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          <span className="font-primary">Delete</span>
        </DropdownMenuItem>
      </DeleteModal>
    </DropdownMenuContent>
  );
};

export default CampaignOptionModal;
