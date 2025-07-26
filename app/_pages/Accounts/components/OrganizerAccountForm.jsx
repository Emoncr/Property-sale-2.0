"use client"
import * as z from "zod"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import FormikWrapper from "@/components/Formik/FormikWrapper"
import FieldInput from "@/components/Formik/FieldInput"
import FormikAction from "@/components/Formik/FormikAction"
import useFormik from "@/hooks/useFormik"
import useRequest from "@/hooks/useRequest"
import useUserStore from "@/store/userStore"
import userAccountApis from "../utils/accountApis"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/Modal"
import ChangeEmailForm from "./ChangeEmailForm"
import UpdateEmailForm from "./UpdateEmailForm"
import { useIsMobile } from "@/hooks/use-mobile";
import { mutate } from "swr";


const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
})

export default function OrganizerAccountForm() {
  const { user, updateUser } = useUserStore((state) => state)
  const router = useRouter()
  const { handleRequest } = useRequest()
  const [step, setStep] = useState("closed");



  // check is mobile or not
  const isMobile = useIsMobile();

  const form = useFormik({
    schema: formSchema,
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    watchKey: user,
  })


  const { isDirty, isSubmitting } = form.formState

  const handleSubmit = async (data) => {
    try {
      await handleRequest({
        data: data,
        request: userAccountApis.update(user?._id),
        cacheKey: userAccountApis.cacheKey,
        isToast: true,
        handleComplete: (completeData) => {
          updateUser(completeData?.data)

          mutate(userAccountApis.cacheKey, (prev) => {
            if (!prev) return completeData?.data;
            return completeData?.data;
          })
        },
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <>
      <FormikWrapper form={form} onSubmit={handleSubmit}>
        <div className="space-y-8 ">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FieldInput
              form={form}
              name="firstName"
              placeholder="Enter first name"
              label="First Name"
              type="text"
              required
              className="rounded-lg"
            />
            <FieldInput
              form={form}
              name="lastName"
              placeholder="Enter last name"
              label="Last Name"
              type="text"
              required
              className="rounded-lg"
            />
          </div>

          <div className="relative">
            <FieldInput
              form={form}
              name="email"
              placeholder="Enter Email"
              label="Email"
              type="email"
              required
              disabled
              className="rounded-lg"
            />
            <div className="absolute right-0 mr-2 mt-3">
              <Button
                variant="link"
                className="text-blue-500 p-0 h-auto"
                type="button"
                onClick={() => setStep("verify")}
              >
                Change Account Email
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <FormikAction
              isDirty={isDirty}
              isSubmitting={isSubmitting}
              size="lg"
              fullwidth={isMobile ? true : false}
              className="bg-primary hover:bg-primary/90 rounded-lg px-8"
            >
              Save Changes
            </FormikAction>
          </div>
        </div>
      </FormikWrapper>

      <Modal
        open={step !== "closed"}
        maxWidth={"2xl"}
        onOpenChange={(open) => !open && setStep("closed")}
        element={
          step === "verify" ? (
            <ChangeEmailForm onSuccess={() => setStep("update")} onCancel={() => setStep("closed")} email={user?.email} />
          ) : (
            <UpdateEmailForm user={user} onClose={() => setStep("closed")} onCancel={() => setStep("closed")} />
          )
        }
        title={step === "verify" ? "Verify Password" : "Change Email"}
        titleSize="3xl"
        description={step === "verify" ? "Please enter your password" : "Enter your new email"}
        isCancelButtonVisible
      />
    </>
  )
}

