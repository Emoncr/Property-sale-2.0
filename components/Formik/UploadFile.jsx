import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "./FileUploader";

const UploadFile = ({
  form,
  fieldName,
  label,
  maxSize,
  maxFiles,
  required = true,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <div className="space-y-6">
          <FormItem className="w-full">
            <FormLabel>
              {label}{" "}
              {required && (
                <span className="font-bold text-base ml-0.5 text-destructive">
                  *
                </span>
              )}{" "}
            </FormLabel>
            <FormControl>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={maxFiles}
                maxSize={maxSize}

                // progresses={progresses}
                // disabled={isUploading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      )}
    />
  );
};

export default UploadFile;
