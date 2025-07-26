"use client"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const RadioField = ({
    name, form,
    onChange,
    description, required = true, label, radioOptions = [], horizontal = false, ...props
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    {label &&
                        <FormLabel>{label}
                            {required && <span className="font-bold text-base ml-0.5 text-destructive">*</span>}
                        </FormLabel>}
                    <FormControl>
                        <RadioGroup
                            onValueChange={(val) => {
                                field.onChange(val);
                                onChange?.(val);
                            }}
                            defaultValue={field.value}
                            className={`flex space-y-1 gap-x-5 ${horizontal ? "flex-row items-center justify-start" : "flex-col"}`}
                            {...props}
                        >
                            {
                                radioOptions.length != 0 && radioOptions.map((option, index) =>
                                    <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={option.value} />
                                        </FormControl>
                                        <FormLabel className="font-normal">{option.itemLabel}</FormLabel>
                                    </FormItem>
                                )
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />


    )
}

export default RadioField