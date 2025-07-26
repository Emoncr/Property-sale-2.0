"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import FormikWrapper from "@/components/Formik/FormikWrapper";
import useFormik from "@/hooks/useFormik";
import FieldInput from "@/components/Formik/FieldInput";
import { z } from "zod";
import FormikAction from "@/components/Formik/FormikAction";
import useRequest from "@/hooks/useRequest";
import notificationApis from "../../utils/notificationApis";
import { toast } from "sonner";
import { mutate } from "swr";

const formSchema = z.object({
  subject: z.string().optional(),
  body: z.string().optional(),
  type: z.string().optional(),
});

const variables = [
  "{{organizerId}}",
  "{{campaignName}}",
  "{{campaignGoal}}",
  "{{amountRaised}}",
  "{{websiteName}}",
  "{{websiteUrl}}",
  "{{donorName}}",
  "{{donorEmail}}",
  "{{donorCity}}",
  "{{donorCountry}}",
  "{{donationId}}",
  "{{donationAmount}}",
  "{{donationCurrency}}",
  "{{donationType}}",
  "{{donationInterval}}",
  "{{donationStatus}}",
  "{{organizationName}}",
  "{{organizationEmail}}",
  "{{organizationAddress}}",
  "{{organizationCity}}",
  "{{organizationCountry}}",
  "{{organizationPhone}}",
];
const ContributionConfirmationForm = ({ notificationsData }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
  const subjectRef = useRef(null);
  const bodyRef = useRef(null);

  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      subject: notificationsData?.subject || "",
      body: notificationsData?.body || "",
      type: notificationsData?.type || "",
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  // Update cursor position
  const updateCursorPosition = useCallback((element) => {
    if (element && typeof element.selectionStart === "number") {
      setCursorPosition({
        start: element.selectionStart,
        end: element.selectionEnd,
      });
    }
  }, []);

  // Unified handler for all field events
  const handleFieldEvent = useCallback(
    (fieldName, e) => {
      setFocusedField(fieldName);
      updateCursorPosition(e.target);
    },
    [updateCursorPosition]
  );

  // Insert variable at cursor position
  const insertVariable = useCallback(
    (variable) => {
      if (
        !focusedField ||
        (focusedField !== "subject" && focusedField !== "body")
      ) {
        return;
      }

      const values = form.getValues();
      const currentValue = values[focusedField] || "";
      const ref = focusedField === "subject" ? subjectRef : bodyRef;
      const element = ref.current;

      // If element is null, try to find it by name or id
      let targetElement = element;
      if (!targetElement) {
        // Try to find the element by name attribute
        targetElement = document.querySelector(`[name="${focusedField}"]`);
      }

      if (!targetElement) {
        const newValue = currentValue + variable;
        form.setValue(focusedField, newValue);
        return;
      }

      const { start, end } = cursorPosition;
      const newValue =
        currentValue.slice(0, start) + variable + currentValue.slice(end);
      form.setValue(focusedField, newValue);

      // Focus and position cursor after a short delay
      setTimeout(() => {
        if (targetElement) {
          targetElement.focus();
          const newCursorPos = start + variable.length;
          targetElement.setSelectionRange(newCursorPos, newCursorPos);
          setCursorPosition({ start: newCursorPos, end: newCursorPos });
        }
      }, 10);
    },
    [focusedField, cursorPosition, form]
  );

  const { handleRequest } = useRequest();

  const handleSubmit = async (data) => {
    const response = await handleRequest({
      data,
      request: notificationApis.update,
      cacheKey: notificationApis.cacheKeyforContributionConfirmation,
      isToast: false,
      handleComplete: (completeData) => {
        toast.success("Template update successful");

        mutate(
          notificationApis.cacheKeyforContributionConfirmation,
          (prev) => {
            if (!prev || !completeData?.data) return prev;
            return {
              ...prev,
              data: completeData.data,
            };
          },
          false // don't revalidate
        );
      },
    });

    if (response?.data) {
      form.reset(response.data);
    }
  };

  return (
    <FormikWrapper form={form} onSubmit={handleSubmit}>
      <div className="max-w-full mx-auto p-3 sm:p-6 bg-white font-primary border border-gray-200 rounded-xl pb-6 sm:pb-10 lg:pb-16">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Contribution Confirmation
          </h1>

          {/* Button Group - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log("Send Test Email clicked")}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 text-sm sm:text-base"
            >
              Send Test Email
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-primary bg-white hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Variables
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 sm:w-64"
                align="end"
                side="bottom"
                sideOffset={4}
              >
                <ScrollArea className="h-48 sm:h-64">
                  <div className="p-1">
                    {variables.map((variable, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => insertVariable(variable)}
                        className="font-mono text-xs sm:text-sm cursor-pointer focus:bg-gray-100 px-2 py-2"
                      >
                        {variable}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-600 mb-4 sm:mb-6">
              For Donor
            </h2>

            {/* Subject Field */}
            <div className="space-y-2">
              <FieldInput
                name="subject"
                form={form}
                placeholder="Enter subject"
                type="text"
                label="Subject"
                ref={subjectRef}
                onFocus={(e) => handleFieldEvent("subject", e)}
                onClick={(e) => handleFieldEvent("subject", e)}
                onKeyUp={(e) => handleFieldEvent("subject", e)}
                onSelect={(e) => handleFieldEvent("subject", e)}
              />
            </div>

            {/* Body Field */}
            <div className="space-y-2">
              <FieldInput
                name="body"
                form={form}
                placeholder="Enter body"
                type="text"
                label="Email Body"
                multiline={true}
                className="w-full h-[150px] sm:h-[200px] lg:h-[250px]"
                ref={bodyRef}
                onFocus={(e) => handleFieldEvent("body", e)}
                onClick={(e) => handleFieldEvent("body", e)}
                onKeyUp={(e) => handleFieldEvent("body", e)}
                onSelect={(e) => handleFieldEvent("body", e)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Responsive */}
      <div className="mt-6 sm:mt-8 flex justify-stretch sm:justify-end gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-0">
        <FormikAction
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          className="w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base"
        >
          Save Changes
        </FormikAction>
      </div>
    </FormikWrapper>
  );
};

export default ContributionConfirmationForm;
