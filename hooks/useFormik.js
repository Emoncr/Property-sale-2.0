// hooks/useFormik.ts
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useFormik = ({ schema, defaultValues, watchKey, ...props }) => {
  const form = useForm({
    resolver: zodResolver(schema || {}),
    defaultValues: defaultValues || {},
    ...props,
  });

  // auto reinitialize when watchKey changes
  useEffect(() => {
    if (watchKey) {
      form.reset(defaultValues);
    }
  }, [watchKey]);

  return form;
};

export default useFormik;
