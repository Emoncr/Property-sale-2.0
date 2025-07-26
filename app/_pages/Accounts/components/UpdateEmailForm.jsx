"use client"

import { useState } from "react"
import { z } from "zod"
import useRequest from "@/hooks/useRequest"
import useUserStore from "@/store/userStore"
import useFormik from "@/hooks/useFormik"
import FormikWrapper from "@/components/Formik/FormikWrapper"
import FieldInput from "@/components/Formik/FieldInput"
import FormikAction from "@/components/Formik/FormikAction"



import { useRouter } from "next/navigation"
import { toast } from "sonner"
import authApis from "../../Auth/utils/authApis"
import { mutate } from "swr"
const emailSchema = z.object({
    email: z.string().nonempty("Email is required").email({ message: "Please enter a valid email address" }),
})

const UpdateEmailForm = ({ user, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleRequest } = useRequest()
    const { updateUser } = useUserStore((state) => state)
    const router = useRouter()


    const form = useFormik({
        schema: emailSchema,
        defaultValues: {
            old_email: user?.email,
            email: "",
        }
    })

    const { isDirty, isSubmitting } = form.formState

    //onClose('closed');


    const handleSubmit = async (email) => {
        try {
            if (email.email === user?.email) {
                toast.error("Please enter a different email address.");
                return;
            }
            const result = emailSchema.safeParse(email);
            if (!result.success) {
                toast.error(result.error.issues[0].message);
            } else {
                const data = {
                    email: email.email
                }
                await handleRequest({
                    data,
                    cacheKey: authApis.cacheKey,
                    request: authApis.changeEmail,
                    handleComplete: (dataComplete) => {
                        if (dataComplete.success && dataComplete.statusCode === 200) {
                            const newEmail = email.email;
                            mutate(
                                authApis.cacheKey,
                                (prev) => {
                                    if (!prev?.data) return prev;

                                    const updatedData = {
                                        ...prev.data,
                                        email: newEmail,
                                        user: {
                                            ...prev.data.user,
                                            email: newEmail,
                                        },
                                    };

                                    // Update local context or Zustand/Redux store
                                    updateUser(updatedData);
                                    return {
                                        ...prev,
                                        data: updatedData,
                                    };
                                },
                                false // Don't revalidate immediately
                            );
                            router.refresh();
                            toast.success("Email updated successfully.");
                            onClose?.("closed");
                        }
                    },
                    isToast: false,
                    handleError: (error) => {
                        if (error.success === false && error.statusCode === 409 && error.message === "Email already exists") {
                            toast.error("Email already exists for this role. Please use a different one.");
                        } else {
                            toast.error(error.message);
                        }
                    }
                });

            }
        } catch (err) {
            console.error(err);
        }
    };

    return (

        <FormikWrapper
            form={form}
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <div className="space-y-5">

                <FieldInput
                    form={form}
                    name="old_email"
                    type="text"
                    placeholder="Old email address"
                    disabled={true}
                    required
                    autoComplete="email"
                />

                {/* <Label htmlFor="new-email">New Email <span className="text-red-500">*</span></Label> */}

                <FieldInput
                    form={form}
                    name="email"
                    type="text"
                    placeholder="Enter your new email address"
                    disabled={isLoading}
                    required
                    autoComplete="email"
                />
            </div>

            <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-5">
                {/*  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="sm:w-auto w-full order-2 sm:order-1"
                >
                    Cancel
                </Button> */}

                <FormikAction
                    isDirty={isDirty}
                    isSubmitting={isSubmitting}
                    size="lg"
                    disabled={isLoading}
                    type="submit"
                    fullwidth={true}
                    className="bg-primary hover:bg-primary/90 rounded-lg px-8 sm:px-10 sm:w-auto w-full order-1 sm:order-2"
                >
                    Update
                </FormikAction>

            </div>
        </FormikWrapper>
    )
}

export default UpdateEmailForm
