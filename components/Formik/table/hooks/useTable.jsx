import useApi from "@/hooks/useApi";
import useSyncParams from "@/hooks/useSyncParams";
import useSelect from "./useSelect";
import { useEffect } from "react";

const useTable = ({ params, api, apiCacheKey }) => {


  const { selectedRows, handleRowSelect, handleSelectAll, handleUnselectAll } =
    useSelect();

  const { routerSyncParams, searchParamsSyncParams } = useSyncParams();

  const searchParams = searchParamsSyncParams;
  const pageParams = searchParams?.get("page");
  const per_pageParams = searchParams?.get("per_page");
  const page = (isNaN(per_pageParams) || pageParams) < 1 ? 1 : pageParams ?? 1;
  const per_page =
    (isNaN(per_pageParams) || per_pageParams < 1 ? 10 : per_pageParams) ?? 10;

  const { data, isLoading, cacheKey } = useApi({
    params: {
      page,
      limit: per_page,
      ...params,
    },
    api,
    cacheKey: apiCacheKey,
  });

  useEffect(() => {
    handleUnselectAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsSyncParams]);


  const tabelInfo = {
    data,
    pagination: {
      ...data?.pagination,
      page: Number(page),
      per_page: Number(per_page),
    },
    routerSyncParams,
    handleRowSelect,
    handleSelectAll,
    handleUnselectAll,
    selectedRows,
    cacheKey,
    isLoading,
  };
  return { tabelInfo };
};
export default useTable;
