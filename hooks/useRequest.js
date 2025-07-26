"use client";

//import { useToast } from "@/components/ui/use-toast";
import catchError from "@/lib/catchError";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-hot-toast";

const useRequest = () => {
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { data: authToken } = useSWR("token", (...args) => args[1]);

  const handleRequest = async ({
    isDelete = false,
    data,
    token,
    id,
    cacheKey = null,
    request,
    handleComplete,
    isToast = true,
    isFormData = false,
    actionRoute = null,
    handleError = null,
  }) => {
    if (isFormData) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          data[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, data[key]);
        }
      });
      data = formData;
    }
    setIsLoading(true);
    try {
      const result = await request({
        data: data,
        token: authToken || token,
      });
      if (result?.success) {
        if (cacheKey) {
          await mutate(
            (key) => Array.isArray(key) && key[0] === cacheKey,
            (response) => {
              if (id && isDelete) {
                // For Delete
                return {
                  data: {
                    ...response,
                    items: response?.data?.items.filter(
                      (curr) => curr._id !== id
                    ),
                  },
                };
              } else if (id) {
                // For Update
                return {
                  data: {
                    ...response,
                    items: response?.data.map((curr) =>
                      curr?._id === id ? { ...curr, ...result.data } : curr
                    ),
                  },
                };
              } else {
                // For Create
                return {
                  data: {
                    ...response,
                    items: [...response.data, result.data],
                  },
                };
              }
            },
            false
          );
        }
        handleComplete(result);
        if (isToast) {
          toast.success(result.message || "Success");
        }
        return result;
      }
    } catch (error) {
      catchError(error, toast, actionRoute, isToast);
      handleError && handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRequest, isLoading };
};

export default useRequest;
