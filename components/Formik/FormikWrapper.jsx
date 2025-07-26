import { Form } from "@/components/ui/form";

const FormikWrapper = ({ onSubmit, form, children }) => {
  const handleFormSubmit = (event) => {
    if (event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }
    }

    return form.handleSubmit(onSubmit)(event);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={(e) => handleFormSubmit(e)}>{children}</form>
    </Form>
  );
};

export default FormikWrapper;
