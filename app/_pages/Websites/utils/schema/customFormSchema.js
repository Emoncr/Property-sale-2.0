import * as z from "zod";
// Validation schema with all fields optional
export const customFormSchema = z
  .object({
    campaign: z.string().optional(),

    // Color validations - all optional
    formBgColor: z.string().optional(),
    primaryColor: z.string().optional(),
    buttonTextColor: z.string().optional(),
    fieldTextColor: z.string().optional(),
    fieldBgColor: z.string().optional(),
    borderColor: z.string().optional(),
    labelColor: z.string().optional(),

    // Boolean fields - all optional
    recurringDonation: z.boolean().optional(),
    donorComments: z.boolean().optional(),
    coverPlatformFee: z.boolean().optional(),
    coverProcessingFee: z.boolean().optional(),
    donationByCompany: z.boolean().optional(),
    isPopActive: z.boolean().optional(),
    socialShare: z.boolean().optional(),

    // Array validations - all optional
    recurringDonationOptions: z
      .array(
        z.object({
          label: z.string().optional(),
          value: z.string().optional(),
        })
      )
      .optional(),

    defaultInterval: z.string().optional(),

    paymentAmounts: z
      .array(
        z.object({
          id: z.string().optional(),
          amount: z.number().positive("Amount must be positive").optional(),
        })
      )
      .optional(),

    popupKey: z.string().optional(),
    thankYouMessage: z
      .string()
      .max(500, "Thank you message cannot exceed 500 characters")
      .optional(),
    redirectUrl: z.string().optional(),

    // Object validation - made optional with inner fields also optional
    currency: z
      .object({
        name: z.string().optional(),
        symbol: z.string().optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Conditional validation for popupKey (maintained but only if both fields exist)
    if (data.isPopActive && data.isPopActive === true && !data.popupKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Popup key is required when popup is active",
        path: ["popupKey"],
      });
    }
  });

export const customFormDefaultValues = (data) => {
  // Required string fields
  const defaultValues = {
    campaign: data?.campaign?._id || "",
    // Color values
    formBgColor: data?.formBgColor || "#f5f5f5",
    primaryColor: data?.primaryColor || "#008C8B", // Blue color
    buttonTextColor: data?.buttonTextColor || "#FFFFFF", // White
    fieldTextColor: data?.fieldTextColor || "#292929", // Dark gray
    fieldBgColor: data?.fieldBgColor || "#FFFFFF", // White
    borderColor: data?.borderColor || "#cccccc", // Light gray
    labelColor: data?.labelColor || "#000000", // Black

    // Boolean values
    recurringDonation: data?.recurringDonation || false,
    donorComments: data?.donorComments || false,
    coverPlatformFee: data?.coverPlatformFee || false,
    coverProcessingFee: data?.coverProcessingFee || false,
    donationByCompany: data?.donationByCompany || false,
    isPopActive: data?.isPopActive || false,
    socialShare: data?.socialShare || false,

    // Array values
    recurringDonationOptions: data?.recurringDonationOptions || [],
    paymentAmounts: data?.paymentAmounts || [],

    // Default values for payment amounts
    popupKey: data?.popupKey || "",
    thankYouMessage: data?.thankYouMessage || "",
    redirectUrl: data?.redirectUrl || "",
    defaultInterval: data?.defaultInterval || "monthly",
    currency: data?.currency || {
      name: "USD",
      symbol: "$",
    },
  };
  return defaultValues;
};
