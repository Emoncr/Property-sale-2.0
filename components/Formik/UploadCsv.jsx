import React from 'react'
import CsvFileUpload from "@/components/Formik/CsvFileUpload";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


const UploadCsv = ({
    form,
    fieldName,
    label,
    required = true,
    className = "",
}) => {
    return (
        <FormField
            control={form.control}
            name={fieldName || "csvFile"}
            render={({ field }) => (
                <div className={`${className} space-y-6`}>
                    <FormItem className="w-full">
                        <FormLabel>
                            {label}
                            {required && (
                                <span className="font-bold text-base ml-0.5 text-destructive">*</span>
                            )}
                        </FormLabel>
                        <FormControl>
                            <CsvFileUpload
                                accept={".csv"}
                                onUpload={(data) => field.onChange({ target: { name: field.name, value: data } })}
                            />

                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
            )}
        />
    );
};

export default UploadCsv;
