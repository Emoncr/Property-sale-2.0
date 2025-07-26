const catchError = (error, toast, isToast) => {
  let responseError = error?.info?.errors;
  if (responseError) {
    let findErrorName = Object.keys(responseError);
    findErrorName.forEach((errorName) => {
      toast.error(
        responseError?.[errorName].message || "An unknown error has occurred."
      );
    });
  } else {
    toast.error(error?.message || "An unknown error has occurred.");
  }
};

export default catchError;
