import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Loader } from 'lucide-react';
import FormikWrapper from "@/components/Formik/FormikWrapper"
import FieldInput from "@/components/Formik/FieldInput"
import FormikAction from "@/components/Formik/FormikAction"
import useFormik from "@/hooks/useFormik"
import { passwordValidationSchema } from '@/utils/passwordSchema';
import useRequest from '@/hooks/useRequest';
import authApis from '../../Auth/utils/authApis';


const passwordSchema = z.object({
    password: passwordValidationSchema
});


const ChangeEmailForm = ({ onSuccess, onCancel, email }) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const form = useFormik({
        schema: passwordSchema,
        defaultValues: {
            password: '',
        }
    })

    const { handleRequest, isLoading } = useRequest()

    const { isDirty, isSubmitting } = form.formState
    /* onCancel('closed');
                        onSuccess && onSuccess(); // trigger next step
    
                        setLoading(false);*/

    const handleSubmit = async (passwordData) => {

        setLoading(true);
        try {
            const result = passwordSchema.safeParse(passwordData);
            if (!result.success) {
                setError(result.error.issues[0].message);
                setLoading(false);
            } else {
                setError('');
                await handleRequest({
                    data: { email, password: passwordData.password },
                    request: authApis.signin,
                    cacheKey: authApis.cacheKey,
                    isToast: false,
                    handleComplete: (dataComplete) => {
                        if (dataComplete.success && dataComplete.statusCode) {
                            onCancel('closed');
                            onSuccess && onSuccess(); // trigger next step
                            setLoading(false);
                        }
                    },
                    handleError: (error) => {
                        toast.error(error.msg || "An unknown error has occurred.");
                        setLoading(false);
                    }
                })

            }
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <FormikWrapper
            form={form}
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <div className="space-y-2">

                <FieldInput
                    form={form}
                    name="password"
                    placeholder="Enter your password"
                    label="Password"
                    required
                    autoComplete="current-password"

                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div className="flex justify-end gap-4 pt-5">
                <FormikAction
                    isDirty={isDirty}
                    isSubmitting={isSubmitting}
                    size="lg"
                    type="submit"
                >
                    Submit
                </FormikAction>
            </div>
        </FormikWrapper>
    );
};

export default ChangeEmailForm;

