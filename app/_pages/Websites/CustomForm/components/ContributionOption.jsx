import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EllipsisVertical, InfoIcon, Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const ContributionOption = ({ formState, form }) => {
  const [addAmount, setAddAmount] = useState(false);
  const [activeDeleteIndex, setActiveDeleteIndex] = useState(null);

  // State for form inputs
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Get current options from form state
  const options = formState?.paymentAmounts || [];
  // Generate unique ID for new items
  const generateUniqueId = () => {
    return `tx${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddContribution = () => {
    if (amount) {
      // Create new item with consistent structure
      const newItem = {
        id: generateUniqueId(),
        name: name || "",
        amount: parseFloat(amount),
        _id: generateUniqueId(),
      };

      const newOptions = [...options, newItem];

      form.setValue("paymentAmounts", newOptions, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      setName("");
      setAmount("");
      setAddAmount(false);
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  // Handle deleting a contribution
  const handleDeleteContribution = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    form.setValue("paymentAmounts", newOptions, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true, // Add this line
    });
    setActiveDeleteIndex(null);
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div>
          <Tooltip>
            <p className="inline-flex items-center gap-1 text-muted-foreground font-medium font-primary">
              Contribution Options
              <TooltipTrigger asChild>
                <InfoIcon className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
            </p>
            <TooltipContent>
              <p className="w-[200px] text-sm">
                Select the type of contribution you want to make on your website
                and the amount you want to donate.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 flex-wrap mt-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="border border-border rounded-xl px-3 py-2 flex items-center justify-between gap-2 relative"
          >
            <p className="text-sm md:text-base lg:text-lg font-semibold font-primary text-muted-foreground">
              {option?.name}{" "}
              <span className="text-black ml-1">${option.amount}</span>
            </p>
            <button
              type="button"
              onClick={() =>
                setActiveDeleteIndex(activeDeleteIndex === index ? null : index)
              }
              className="text-muted-foreground"
            >
              {activeDeleteIndex === index ? (
                <X className="h-5 w-5" />
              ) : (
                <EllipsisVertical className="h-5 w-5" />
              )}
            </button>

            {activeDeleteIndex === index && (
              <button
                type="button"
                onClick={() => handleDeleteContribution(index)}
                className="text-muted-foreground hover:bg-red-600 hover:text-white duration-300 absolute top-10 right-2 z-50 bg-white p-3 py-2 rounded-xl border border-border"
              >
                <span className="flex items-center gap-1 font-primary">
                  Delete
                  <Trash2 className="h-4 w-4" />
                </span>
              </button>
            )}
          </div>
        ))}

        {/* Amount Add Button */}
        <button
          onClick={() => setAddAmount(!addAmount)}
          type="button"
          className={`border border-border rounded-xl px-3 py-2 flex items-center justify-between gap-2 text-muted-foreground hover:bg-gray-100 duration-300`}
        >
          {addAmount ? <X /> : <Plus />}
        </button>
      </div>

      {/* Amount Add Form */}
      {addAmount && (
        <div className="flex items-center justify-start gap-2 flex-wrap mt-4">
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-xl p-2 w-full"
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded-xl p-2 w-full"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddContribution}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContributionOption;
